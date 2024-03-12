import { View, Text,Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Recommendpeople from '../components/Recommendpeople'
import Recommendgroups from '../components/Recommendgroups'

const Explore = () => {
  return (
    <ScrollView>
      <View className="min-h-screen bg-white md:max-w-md md:mx-auto p-2">
      <View className="mt-1 flex items-center space-x-2 p-5 rounded-full w-full h-3 bg-slate-200">
        <TextInput
          className="flex-1 w-full"
          placeholder="Search"
          // Add other TextInput props as needed
        ></TextInput>
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