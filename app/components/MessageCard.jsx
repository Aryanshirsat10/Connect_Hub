import React from 'react'
import { View,Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const MessageCard = ({ content, sender, timestamp }) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('directmessage')}>
    <View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between border-b border-gray-300">
      <View className="flex flex-row">
        <View className="flex items-center">
          <Image
            source={require('../../assets/images/demopost.jpg')}
            style={{ width: 60, height: 60, borderRadius: 20 }}
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-col">
          <Text className="text-xl font-semibold">{sender}</Text>
          <Text className="text-sm text-gray-600">{content}</Text>
        </View>
      </View>
      <View className="flex flex-row gap-4">
      <Text className="text-sm font-light">{timestamp}</Text>
        <View className="flex">
        <Ionicons name="chevron-forward" size={24} color="grey" />
        </View>
        <View>
        </View>
      </View>
      
    </View>
    </TouchableOpacity>
  )
}

export default MessageCard