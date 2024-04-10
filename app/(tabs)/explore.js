import { View, Text,Image, TouchableOpacity, TextInput, ScrollView,RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import Recommendpeople from '../components/Recommendpeople'
import Recommendgroups from '../components/Recommendgroups'
import pb from '../services/connection'

const Explore = () => {
  const [grouplist, setGroupList] = useState([]);
  const [userlist, setUserList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fetchAlumni = async()=>{
    try {
      const records1 = await pb.collection('users').getFullList({
        sort: '-created',
    });
    const filteredUsers = records1.filter(user => user.id !== pb.authStore.model.id);
    setUserList(filteredUsers);
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
  const filteredUsers = userlist.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredGroups = grouplist.filter(group =>
    group.groupname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(()=>{
    fetchAlumni();
    fetchgrouplist();
  },[]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Here you can call your fetchPosts and fetchuser functions again
    fetchAlumni();
    fetchgrouplist();
    // to refresh the data. Make sure to set refreshing back to false
    // once the data is fetched.
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
            onChangeText={text => setSearchTerm(text)}
          />
        </View>
      </View>
      <View className="mt-1 p-2">
        <Text className="text-xl font-bold">Recommendations</Text>
        <View className="mt-1 space-y-2" />
        {filteredUsers.map((user) => (
              <Recommendpeople key={user.id} user1={user} />
            ))}
        </View>
        <View className="mt-1 p-2">
        <Text className="text-xl font-bold">Recommended Groups</Text>
        <View className="mt-1 space-y-2" />
        {filteredGroups.map((group) => (
              <Recommendgroups key={group.id} group={group} />
            ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Explore