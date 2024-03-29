import React, { useEffect, useState } from 'react'
import { View, Text,Image, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link,useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import MessageCard from '../components/MessageCard';
import pb from '../services/connection';
   
const messages = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [messageslist,setMessagesList]=useState([]);
  const [receiveruser , setReceiverUser] = useState({});
  const currentuser = pb.authStore.model.id;
  const fetchmessagelist = async() =>{
    console.log(currentuser);
    try {
      const records = await pb.collection('chats').getFullList({
        sort: '-created',
        expand: 'sender,sender1'
    });
    console.log(`messagelist${JSON.stringify(records,null,2)}`);


    const enhancedMessages = await Promise.all(records.map(async (record) => {
      if (record.receiver) {
        try {
          const receiverName = await pb.collection('users').getOne(`${record.receiver}`);
          return { ...record, receiverUser: receiverName };
        } catch (error) {
          console.log(error);
          return record; // Return the original record if there's an error
        }
      }
      return record; // Return the original record if there's no receiver
    }));
    console.log(`enhancedmessage:${JSON.stringify(enhancedMessages,null,2)}`);
    setMessagesList(enhancedMessages);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchmessagelist();
  },[]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Here you can call your fetchPosts and fetchuser functions again
    // to refresh the data. Make sure to set refreshing back to false
    // once the data is fetched.
    fetchmessagelist();
    setRefreshing(false);
  }, []);
  return (
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >
    <View className="bg-white">
        <View className="flex-row items-center justify-between border-t border-gray-300 p-2">
        <TouchableOpacity className="rounded-full p-3">
            <Feather name="search" size={24} color="grey" />
        </TouchableOpacity>    
        <TextInput
          className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-sm"
          placeholder="Message"
          placeholderTextColor="#999"
        />
        <TouchableOpacity className="rounded-full p-3">
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
        {messageslist.map((message) => (
        <MessageCard
          key={message}
          content={message.text}
          sender={currentuser === message.sender ? message.expand?.sender1 : message.expand?.sender}
          timestamp={message.updated}
          currentuser = {currentuser}
          id={message.id}
        />
      ))}
    </View>
    </ScrollView>
  )
}

export default messages