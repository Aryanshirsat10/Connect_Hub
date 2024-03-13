import React from 'react'
import { View, Text,Image, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import MessageCard from '../components/MessageCard';
const messageslist = [
    { id: 1, content: 'Hello!', sender: 'John Doe', timestamp: '10:00 AM' },
    { id: 2, content: 'How are you?', sender: 'Jane Doe', timestamp: '10:05 AM' },
    // Add more messages as needed
   ];
   
const messages = () => {
  return (
    <View className="bg-white">
        <View className="flex-row items-center justify-between border-t p-2">
        <TouchableOpacity className="rounded-full p-3">
            <Feather name="search" size={24} color="grey" />
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
        {messageslist.map((message) => (
        <MessageCard
          key={message.id}
          content={message.content}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      ))}
    </View>
  )
}

export default messages