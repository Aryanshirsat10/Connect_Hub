import { View, Text,Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import Recommendpeople from '../components/Recommendpeople'
import Recommendgroups from '../components/Recommendgroups'

const Explore = () => {
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
          <Recommendpeople/>
          <Recommendpeople/>
          <Recommendpeople/>
          <Recommendpeople/>
          <Recommendpeople/>
          <Recommendpeople/>
        </View>
        <View className="mt-1 p-2">
        <Text className="text-xl font-bold">Recommended Groups</Text>
        <View className="mt-1 space-y-2" />
          <Recommendgroups/>
          <Recommendgroups/>
          <Recommendgroups/>
          <Recommendgroups/>
        </View>
      </View>
    </ScrollView>
  )
}

export default Explore