import { View, Text, TextInput, ScrollView, TouchableOpacity,RefreshControl } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import Internshipcard from '../components/Internshipcard';
import pb from '../services/connection';
import { router } from 'expo-router';


const jobs = () => {
  const [joblist,setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const fetchjobs = async() =>{
    console.log("user type from jobs:", pb.authStore.model.Type);
    try {
      const records = await pb.collection('internships').getFullList({
        sort: '-created',
    });
    console.log(`internships:${JSON.stringify(records)}`);
    setJobList(records);
    } catch (error) {
      console.log(error);
    }
  }
  const filteredJobs = joblist.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Here you can call your fetchPosts and fetchuser functions again
    fetchjobs();
    // to refresh the data. Make sure to set refreshing back to false
    // once the data is fetched.
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchjobs();
  }, [])
  
  if(pb.authStore.model.Type == "Student"){
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
        <View className="flex flex-row w-full items-center p-5">
          {/* Repeat the following block for each stat */}
          <TouchableOpacity onPress={() => router.push({pathname: '/screens/jobdetails', params: {title: "Saved Jobs"}})} className="w-[50%]">
          <View className="flex flex-col items-center">
            <Text className="text-center text-sm font-medium">8</Text>
            <Text className="text-center text-xs">Saved</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push({pathname: '/screens/jobdetails', params: {title: "Applied Jobs"}})} className="w-[50%]">
          <View className="flex flex-col items-center">
            <Text className="text-center text-sm font-medium">8</Text>
            <Text className="text-center text-xs">Applied</Text>
          </View>
          </TouchableOpacity>
          {/* End of stat block */}
        </View>
        <View className="mt-2 p-2">
          <Text className="text-xl font-bold">Your career interest</Text>
          <View className="mt-2 space-y-2 flex flex-row justify-between">
            {/* Repeat the following block for each item */}
            <View className="flex items-center justify-between">
              <Text className="text-lg font-semibold">Software Developer</Text>
            </View>
            <FontAwesome name="bell-o" size={24} color="black" />
            {/* End of item block */}
          </View>
          <View className="mt-2 space-y-2 flex flex-row justify-between">
            {/* Repeat the following block for each item */}
            <View className="flex items-center justify-between">
              <Text className="text-lg font-semibold">Software Developer</Text>
            </View>
            <FontAwesome name="bell-o" size={24} color="black" />
            {/* End of item block */}
          </View>
          <View className="mt-2 space-y-2 flex flex-row justify-between">
            {/* Repeat the following block for each item */}
            <View className="flex items-center justify-between">
              <Text className="text-lg font-semibold">Software Developer</Text>
            </View>
            <FontAwesome name="bell-o" size={24} color="black" />
            {/* End of item block */}
          </View>
        </View>
        <View className="mt-1 p-2">
          <Text className="text-xl font-bold">Internships for you</Text>
          <View className="mt-2 space-y-2" />
          {filteredJobs.map((job) => (
                <Internshipcard key={job.id} job={job} />
              ))}
          </View>
        </View>  
      </ScrollView>
  )
  }
  else if(pb.authStore.model.Type == "Alumni"){
    return(
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
        <View className="flex flex-row w-full items-center p-5">
          {/* Repeat the following block for each stat */}
          <TouchableOpacity onPress={() => router.push({pathname: '/screens/jobdetails', params: {title: "Saved Jobs"}})} className="w-[50%]">
          <View className="flex flex-col items-center">
            <Text className="text-center text-sm font-medium">8</Text>
            <Text className="text-center text-xs">Saved</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push({pathname: '/screens/jobdetails', params: {title: "Posted Jobs"}})} className="w-[50%]">
          <View className="flex flex-col items-center">
            <Text className="text-center text-sm font-medium">8</Text>
            <Text className="text-center text-xs">Posted</Text>
          </View>
          </TouchableOpacity>
          {/* End of stat block */}
        </View>
        <View className="mt-2 p-2">
          <Text className="text-xl font-bold">Your Field of Interest</Text>
          <View className="mt-2 space-y-2 flex flex-row justify-between">
            {/* Repeat the following block for each item */}
            <View className="flex items-center justify-between">
              <Text className="text-lg font-semibold">Software Developer</Text>
            </View>
            <FontAwesome name="bell-o" size={24} color="black" />
            {/* End of item block */}
          </View>
          <View className="mt-2 space-y-2 flex flex-row justify-between">
            {/* Repeat the following block for each item */}
            <View className="flex items-center justify-between">
              <Text className="text-lg font-semibold">Software Developer</Text>
            </View>
            <FontAwesome name="bell-o" size={24} color="black" />
            {/* End of item block */}
          </View>
          <View className="mt-2 space-y-2 flex flex-row justify-between">
            {/* Repeat the following block for each item */}
            <View className="flex items-center justify-between">
              <Text className="text-lg font-semibold">Software Developer</Text>
            </View>
            <FontAwesome name="bell-o" size={24} color="black" />
            {/* End of item block */}
          </View>
        </View>
        <View className="mt-1 p-2">
          <Text className="text-xl font-bold">Current Internships Posted</Text>
          <View className="mt-2 space-y-2" />
          {filteredJobs.map((job) => (
                <Internshipcard key={job.id} job={job} />
              ))}
          </View>
        </View>
      </ScrollView>
    )
  }
  else {
    return (
      <ScrollView>
        <View className="min-h-screen bg-white md:max-w-md md:mx-auto p-2">
          <Text className="flex flex-wrap w-full text-md font-semibold">select the user type from profile to view this page</Text>
        </View>
      </ScrollView>
    );
  }
}

export default jobs