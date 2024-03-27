import { View, Text,Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import Recommendpeople from '../components/Recommendpeople'
import Recommendgroups from '../components/Recommendgroups'
import pb from '../services/connection'

const Explore = () => {
  const [grouplist, setGroupList] = useState([]);
  const [userlist, setUserList] = useState([]);
  const fetchAlumni = async()=>{
    try {
      const records1 = await pb.collection('users').getFullList({
        sort: '-created',
    });
    setUserList(records1);
    console.log(`user from explore:${JSON.stringify(records1)}`);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchgrouplist = async()=>{
    try {
      const records = await pb.collection('groups').getFullList({
        sort: '-created',
    });
    setGroupList(records);
    console.log(`grouplist${JSON.stringify(records)}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchAlumni();
    fetchgrouplist();
  },[]);
  return (
    <ScrollView>
      <View className="min-h-screen bg-white md:max-w-md md:mx-auto p-2">
      <View className="flex-row items-center justify-between border-t border-gray-300 p-2">
        <View className="flex-row bg-gray-200 rounded-full">
          <TouchableOpacity className="rounded-full p-3 pr-0">
              <Feather name="search" size={24} color="grey" />
          </TouchableOpacity>    
          <TextInput
            className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-sm"
            placeholder="Message"
            placeholderTextColor="#999"
          />
        </View>
      </View>
      <View className="mt-1 p-2">
        <Text className="text-xl font-bold">Recommendations</Text>
        <View className="mt-1 space-y-2" />
        {userlist.map((user) => (
              <Recommendpeople key={user.id} user1={user} />
            ))}
        </View>
        <View className="mt-1 p-2">
        <Text className="text-xl font-bold">Recommended Groups</Text>
        <View className="mt-1 space-y-2" />
        {grouplist.map((group) => (
              <Recommendgroups key={group.id} group={group} />
            ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Explore