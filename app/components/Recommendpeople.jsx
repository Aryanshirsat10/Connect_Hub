import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
const Recommendpeople = () => {
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
      <View className="flex flex-row gap-4">
      <TouchableOpacity className="border-gray-300 rounded-lg px-2 py-1 mt-2 bg-[#007AFF] w-20 items-center shadow-xl">
        <Text className="font-semibold text-lg text-white">Follow</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default Recommendpeople