import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons';

const post = () => {
  return (
    <View >
      <View className="bg-white text-black h-full">
      <View className="flex flex-row items-center justify-between px-4 pt-4">
      <Ionicons name="close" size={24} color="black" />
        <View className="flex items-center space-x-2">
          <View className="relative">
            {/* <Image
              className="w-8 h-8 rounded-full"
              source={{ uri: '/placeholder.svg?height=32&width=32' }}
              resizeMode="cover"
            /> */}
            <Text className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">U</Text>
          </View>
          <Text className="text-white">Anyone</Text>
        </View>
        <TouchableOpacity className="bg-gray-300 text-black px-4 py-2 rounded">
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
      <View className="px-4 py-6">
        <TextInput
          className="bg-transparent placeholder-gray-400"
          placeholder="Share your thoughts..."
          placeholderTextColor="#999"
        />
      </View>
      <View className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-white">
        <View className="flex justify-between w-full flex-row">
          <TouchableOpacity className="bg-gray-200 text-white px-4 py-2 rounded">
            <Text>Rewrite with AI</Text>
          </TouchableOpacity>
          <View className="flex space-x-4 flex-row">
            <Feather name="camera" size={24} color="black" />
            <Feather name="plus" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
    </View>
  )
}

export default post