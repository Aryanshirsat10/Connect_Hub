import { View, Text,Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import ChatBubble from 'react-native-chat-bubble';
import { useLocalSearchParams } from 'expo-router';

const Directmsg = () => {
  const navigation = useNavigation();
  const { sender } = useLocalSearchParams();
  return (
    <View className="flex-1 mt-7">
      <View className="flex-row items-center p-4 border-b border-gray-300">
        <TouchableOpacity className="mr-4" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex flex-col items-center justify-center w-[80%]">
          <Image
            className="w-10 h-10 rounded-full"
            source={{ uri: 'https://github.com/shadcn.png' }}
            resizeMode="cover"
          />
          <Text className="font-semibold pt-2 text-md">{sender}</Text>
        </View>
      </View>
      <View className="flex-1 overflow-y-auto p-4">
        {/* Content goes here */}
        <ChatBubble
          isOwnMessage={true}
          bubbleColor='#94c4f7'
          tailColor='#94c4f7'
          withTail={false}
          onPress={() => console.log("Bubble Pressed!")}
        >
          <Text className="flex flex-wrap">Your message content</Text>
        </ChatBubble>
        <ChatBubble
          isOwnMessage={true}
          bubbleColor='#94c4f7'
          tailColor='#94c4f7'
          withTail={true}
          onPress={() => console.log("Bubble Pressed!")}
        >
          <Text>Your message content</Text>
        </ChatBubble>
        <ChatBubble
          isOwnMessage={false}
          bubbleColor='#1084ff'
          tailColor='#1084ff'
          withTail={true}
          onPress={() => console.log("Bubble Pressed!")}
        >
          <Text>Your message content</Text>
        </ChatBubble>
      </View>
      <View className="flex-row items-center justify-between p-2">
        <TouchableOpacity className="rounded-full p-3">
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-sm"
          placeholder="Message"
          placeholderTextColor="#999"
        />
        <TouchableOpacity className="rounded-full p-3">
        <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between p-2">
        {/* Icon buttons go here */}
      </View>
    </View>
  )
}

export default Directmsg