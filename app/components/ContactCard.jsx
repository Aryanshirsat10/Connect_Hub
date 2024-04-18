import { View, Text, Image } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContactCard = () => {
  return (
    <View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between shadow-xl rounded-lg">
    <View className="flex flex-row">
        <View className="flex items-center p-2">
        <MaterialCommunityIcons name="contacts-outline" size={24} color="black" />
        </View>
        <View className="flex flex-col">
        <Text className="text-lg font-semibold capitalize">Contact Type</Text>
        <Text className="text-sm text-gray-600">Contact</Text>
        </View>
    </View>
    </View>
  )
}

export default ContactCard