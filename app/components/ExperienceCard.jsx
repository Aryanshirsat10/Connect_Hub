import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ExperienceCard = () => {
  return (
    <View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between shadow-xl rounded-lg">
    <View className="flex flex-row">
        <View className="flex items-center">
        <Image
            source={require('../../assets/images/demopost.jpg')}
            className="h-16 w-16 rounded-full"
            resizeMode="cover"
        />
        </View>
        <View className="flex flex-col">
        <Text className="text-lg font-semibold capitalize">Company Name</Text>
        <Text className="text-sm text-gray-600">Job Title</Text>
        <Text className="text-sm text-gray-600">duration</Text>
        </View>
    </View>
    </View>
  )
}

export default ExperienceCard