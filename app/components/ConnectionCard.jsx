import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, FontAwesome, FontAwesome6 } from '@expo/vector-icons'

const ConnectionCard = () => {
  return (<View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between">
  <View className="flex flex-row">
    <View className="flex items-center">
      <Image
        source={require('../../assets/images/demopost.jpg')}
        style={{ width: 40, height: 40, borderRadius: 20 }}
        resizeMode="cover"
      />
    </View>
    <View className="flex flex-col">
      <Text className="text-lg font-semibold">Riya Hemani</Text>
      <Text className="text-sm text-gray-600">5 days ago</Text>
    </View>
  </View>
  <View className="flex flex-row gap-4">
    <View>
    <TouchableOpacity className="ml-5">
    <FontAwesome6 name="circle-xmark" size={36} color="red" />
    </TouchableOpacity>
    </View>
    <View>
    <FontAwesome6 name="circle-check" size={36} color="green" />
    </View>
  </View>
  
</View>
)
}

export default ConnectionCard