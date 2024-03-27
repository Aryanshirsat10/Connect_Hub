import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import Internshipcard from '../components/Internshipcard';
import pb from '../services/connection';


const jobs = () => {
  const [joblist,setJobList] = useState([]);

  const fetchjobs = async() =>{
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

  useEffect(() => {
    fetchjobs();
  }, [])
  
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
      <View className="flex flex-row w-full items-center justify-between p-5">
        {/* Repeat the following block for each stat */}
        <View className="flex flex-col items-center">
          <Text className="text-center text-sm font-medium">8</Text>
          <Text className="text-center text-xs">Saved</Text>
        </View>
        <View className="flex flex-col items-center">
          <Text className="text-center text-sm font-medium">8</Text>
          <Text className="text-center text-xs">Saved</Text>
        </View>
        <View className="flex flex-col items-center">
          <Text className="text-center text-sm font-medium">8</Text>
          <Text className="text-center text-xs">Saved</Text>
        </View>
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
        {joblist.map((job) => (
              <Internshipcard key={job.id} job={job} />
            ))}
        </View>
      </View>  
    </ScrollView>
  )
}

export default jobs