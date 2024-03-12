import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

const jobs = () => {
  return (
    <View>
      <View className="min-h-screen bg-white md:max-w-md md:mx-auto">
      {/* <View className="flex flex-row items-center justify-between">
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text className="text-xl font-semibold">Internships</Text>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </View> */}
      <View className="mt-4 flex items-center space-x-2">
        <Text
          className="flex-1 w-full"
          placeholder="Search"
          // Add other TextInput props as needed
        />
      </View>
      <View className="mt-4 flex flex-row w-full items-center justify-between p-3">
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
      <View className="mt-6 p-2">
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
      <View className="mt-6 p-2">
        <Text className="text-xl font-bold">Internships for you</Text>
        <View className="mt-2 space-y-2" />
          
        </View>
    </View>
    </View>
  )
}

export default jobs