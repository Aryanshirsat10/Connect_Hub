import { View, Text,Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const Explore = () => {
  return (
    <View className="flex-1">
      <View className="flex-row items-center p-4 border-b">
        <TouchableOpacity className="mr-4">
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <Image
            className="w-10 h-10 rounded-full"
            source={{ uri: 'https://github.com/shadcn.png' }}
            resizeMode="cover"
          />
          <Text className="ml-2 font-bold">T</Text>
        </View>
        <View className="ml-4">
          <Text className="font-semibold">Tobias</Text>
          <Text className="text-xs text-gray-500">has notifications silenced</Text>
        </View>
      </View>
      <View className="flex-1 overflow-y-auto">
        {/* Content goes here */}
      </View>
      <View className="flex-row items-center justify-between border-t p-2">
        <TouchableOpacity className="rounded-full p-3">
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-sm"
          placeholder="Message"
          placeholderTextColor="#999"
        />
        <TouchableOpacity className="rounded-full p-3">
          <Ionicons name="mic" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between border-t p-2">
        {/* Icon buttons go here */}
      </View>
    </View>
  )
}

export default Explore