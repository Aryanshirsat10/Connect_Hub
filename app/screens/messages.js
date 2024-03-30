import React, { useEffect, useState } from 'react'
import { View, Text,Image, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link,useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import MessageCard from '../components/MessageCard';
import pb from '../services/connection';
import GroupCard from '../components/GroupCard';
   
const messages = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [messageslist,setMessagesList]=useState([]);
  const [receiveruser , setReceiverUser] = useState({});
  const [grouplist,setGroupList] = useState([]);
  const currentuser = pb.authStore.model.id;

  const createNewChat = async () => {
    // Example logic to create a new chat
    // This is a placeholder. You'll need to implement the actual logic based on your app's requirements.
    try {
      // Assuming you have a way to select a contact and get their ID
      const contactId = await selectContact(); // This function should return the ID of the selected contact

      // Create a new chat with the selected contact
      const newChat = await pb.collection('chats').create({
        sender: currentuser,
        receiver: contactId,
        // Add other necessary fields
      });

    } catch (error) {
      console.error('Error creating new chat:', error);
    }
 };
 const fetchgrouplist = async() => {
  try {
    // you can also fetch all records at once via getFullList
    const records = await pb.collection('groups').getFullList({
      sort: '-created',
    });
    console.log('grouplist',JSON.stringify(records));
    setGroupList(records);
  } catch (error) {
    console.log(error);
  }
 };
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
    fetchgrouplist();
  },[]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Here you can call your fetchPosts and fetchuser functions again
    // to refresh the data. Make sure to set refreshing back to false
    // once the data is fetched.
    fetchmessagelist();
    fetchgrouplist();
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
        <TouchableOpacity className="rounded-full p-3" onPress={createNewChat}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text className="font-semibold text-lg px-4 border-b border-gray-300">DM's</Text>
        {messageslist.filter(message => currentuser === message.sender || currentuser === message.sender1).map((message) => (
        <MessageCard
          key={message.id}
          content={message.text}
          sender={currentuser === message.sender ? message.expand?.sender1 : message.expand?.sender}
          timestamp={message.updated}
          currentuser = {currentuser}
          id={message.id}
        />
      ))}
      <Text className="font-semibold text-lg px-4 border-b border-gray-300">Groups</Text>
      {grouplist.map((group)=>{
        return(
        <GroupCard
          key={group.id}
          content={group?.text || ""}
          sender={group}
          timestamp={group.updated}
          currentuser={currentuser}
          id={group.id}
        />
        );
      })}
    </View>
    </ScrollView>
  )
}

export default messages