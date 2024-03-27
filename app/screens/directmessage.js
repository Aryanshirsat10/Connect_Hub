import { View, Text,Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import ChatBubble from 'react-native-chat-bubble';
import { useLocalSearchParams } from 'expo-router';

const Directmsg = () => {
  const navigation = useNavigation();
  const { sender,currentuser } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  let unsubscribe;

  const sendMessage = async () => {
    const data = {
      text: newMessage,
      user: currentuser.id,
    };
    const createdMessage = await pb.collection('chats').create(data);
    setNewMessage('');
 };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const resultList = await pb.collection('chats').getFullList( {
        sort: 'created',
        expand: 'sender,receiver',
      });
      console.log(`result list: ${JSON.stringify(resultList)}`);
      setMessages(resultList.items);
    };

    const subscribeToMessages = async () => {
      unsubscribe = await pb.collection('chats').subscribe('*', async ({ action, record }) => {
        if (action === 'create') {
          const user = await pb.collection('users').getOne(record.user);
          record.expand = { user };
          setMessages((prevMessages) => [...prevMessages, record]);
        }
        if (action === 'delete') {
          setMessages((prevMessages) => prevMessages.filter((m) => m.id !== record.id));
        }
      });
    };

    fetchInitialMessages();
    subscribeToMessages();

    return () => {
      unsubscribe?.();
    };
 }, []);

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
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            isOwnMessage={message.user === currentuser.id}
            bubbleColor={message.user === currentuser.id ? '#94c4f7' : '#1084ff'}
            tailColor={message.user === currentuser.id ? '#94c4f7' : '#1084ff'}
            withTail={true}
            onPress={() => console.log("Bubble Pressed!")}
          >
            <Text>{message.text}</Text>
          </ChatBubble>
        ))}
      </View>
      <View className="flex-row items-center justify-between p-2">
        <TouchableOpacity className="rounded-full p-3">
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-sm"
          placeholder="Message"
          placeholderTextColor="#999"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity className="rounded-full p-3" onPress={sendMessage}>
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