import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity, Image, ScrollView, RefreshControl} from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import pb from '../services/connection';
import MemberCard from '../components/MemberCard';
import 'react-native-url-polyfill/auto';
import EventSource from "react-native-sse";
global.EventSource = EventSource;

const groupdetail = () => {
    const groupdetail = useLocalSearchParams();
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    console.log(JSON.stringify(groupdetail,null,2));
    const [groupMembers, setGroupMembers] = useState([]); 
    // Convert the groupmembers string into an array
    const groupMembersArray = groupdetail.groupmembers ? groupdetail.groupmembers.split(',') : [];
    const memberCount = groupMembersArray.length;
    const handleRemoveMember = async () => {
      try {
          // Assuming you have the current user's ID stored in a variable called currentUserId
          const currentUserId = pb.authStore.model.id; // Replace this with the actual current user's ID
  
          // Fetch the current group data
          const groupData = await pb.collection('groups').getOne(groupdetail.id);
  
          // Filter out the current user from the groupmembers list
          const updatedGroupMembers = groupData.groupmembers.filter(memberId => memberId !== currentUserId);
  
          // Prepare the data to update the group
          const updateData = {
              ...groupData,
              groupmembers: updatedGroupMembers,
          };
  
          // Update the group with the new members list
          const record = await pb.collection('groups').update(groupdetail.id, updateData);
  
          console.log('Group updated successfully:', record);
      } catch (error) {
          console.error('Error removing member:', error);
      }
  };
  const fetchUser = async()=>{
    try {
      // Fetch each user individually
      const fetchPromises = groupMembersArray.map(memberId =>
        pb.collection('users').getOne(memberId)
    );

    // Execute all fetch requests in parallel
    const users = await Promise.all(fetchPromises);
    console.log(users);
    // Update the state with the fetched users
    setGroupMembers(users);
    
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Here you can call your fetchPosts and fetchuser functions again
    // to refresh the data. Make sure to set refreshing back to false
    // once the data is fetched.
    fetchUser();
    setRefreshing(false);
  }, []);
    useEffect(()=>{
      fetchUser();
    },[groupdetail.groupmembers])
     //realtime
 useEffect(() => {
  try {
    console.log("Attempting to subscribe to real-time updates");
    unsubscribe = pb.collection('groups').subscribe(groupdetail.id, function (e) {
      console.log(e.action);
      console.log(e.record);
      fetchUser();
  }, { /* other options like expand, custom headers, etc. */ });
 
    //  console.log("Successfully subscribed to real-time updates");
  } catch (error) {
     console.error('Error subscribing to real-time updates:', error);
  }
 
  return () => {
    //  console.log("Unsubscribing from real-time updates");
     if (unsubscribe) {
      console.log('Closing subscription');
       pb.collection('groups').unsubscribe('*');
     }
  };
 }, []);
  return (
    <SafeAreaView>
    <ScrollView 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >
    <View className="bg-white">
    <View className="flex-row items-center p-4">
        <TouchableOpacity className="mr-4" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center justify-center w-full mb-4">
          <Image
            className="w-32 h-32 rounded-full"
            source={{ uri: `https://connecthub.pockethost.io/api/files/3fltudul115pos9/${groupdetail.id}/${groupdetail.groupicon}?token=` }}
            resizeMode="cover"
          />
            <Text className="font-semibold pt-2 text-2xl ml-4">{groupdetail.groupname}</Text>
            <Text className="font-medium text-gray-400 text-md">Group {memberCount} members</Text>
        </View>
        <View className="flex flex-col items-start justify-start w-full p-3 bg-white mb-3">
            <Text className="font-medium text-gray-400 text-md">{memberCount} members</Text>
            {groupMembers.map((member, index) => (
              <MemberCard key={index} groupmember={member} />
            ))}
            {console.log(groupdetail.groupmembers)}
        </View>
        <View className="flex flex-col p-3 w-full pl-7">
          <TouchableOpacity className="flex flex-row w-full h-full" onPress={handleRemoveMember}>
          <Ionicons name="exit-outline" size={28} color="red" /> 
          <Text className="text-red-500 text-xl font-semibold pl-2">Exit Group</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default groupdetail