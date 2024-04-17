import React, { useEffect, useState } from 'react'
import { View, Text,Image, TouchableOpacity, TextInput, ScrollView, RefreshControl,Modal,FlatList} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link,router,useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import MessageCard from '../../components/MessageCard';
import pb from '../../services/connection';
import GroupCard from '../../components/GroupCard';
   
const groupmessages = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [grouplist,setGroupList] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const currentuser = pb.authStore.model.id;
//   const followingUserIds = pb.authStore.model.Following;
//   const [followingUsers, setFollowingUsers] = useState([]);

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }

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

 const filteredGroups = grouplist.filter(group =>
    group.groupname.toLowerCase().includes(searchTerm.toLowerCase())
 );

  useEffect(()=>{
    // fetchmessagelist();
    fetchgrouplist();
  },[]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Here you can call your fetchPosts and fetchuser functions again
    // to refresh the data. Make sure to set refreshing back to false
    // once the data is fetched.
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
        <View className="flex-row bg-gray-200 rounded-full w-full mr-0">
          <TouchableOpacity className="rounded-full p-3 pr-0">
              <Feather name="search" size={24} color="gray" />
          </TouchableOpacity>    
          <TextInput
            className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-sm"
            placeholder="Message"
            placeholderTextColor="#999"
            onChangeText={text => setSearchTerm(text)}
            autoCapitalize='none'
          />
        </View>
      </View> 
      {/* <Text className="font-semibold text-lg px-4 border-b border-gray-300">Groups</Text> */}
      {filteredGroups.map((group)=>{
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

export default groupmessages