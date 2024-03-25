import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
const Recommendpeople = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
 };
  return (
    <View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between">
      <View className="flex flex-row">
        <View className="flex items-center mr-2">
          <Image
            source={require('../../assets/images/demopost.jpg')}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-col">
          <Text className="text-lg font-semibold">Software Developer</Text>
          <Text className="text-md text-gray-600">Suggested for you</Text>
        </View>
      </View>
      <View className="flex flex-row gap-2">
      <TouchableOpacity className={`border-gray-300 rounded-lg px-2 py-1 mt-2 ${isFollowing? 'bg-gray-400' : 'bg-[#007AFF]'} ${isFollowing ? 'w-24' : 'w-20'} items-center shadow-xl`} onPress={toggleFollow}>
        <Text className="font-semibold text-lg text-white">{isFollowing ? 'Following' : 'Follow'}</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default Recommendpeople