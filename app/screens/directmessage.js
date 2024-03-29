import { View, Text,Image, TouchableOpacity, TextInput, ScrollView, RefreshControl,ToastAndroid, Platform, AlertIOS,Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import ChatBubble from 'react-native-chat-bubble';
import pb from '../services/connection'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import EventSource from "react-native-sse";
global.EventSource = EventSource;
function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
}
const Directmsg = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { sender} = useLocalSearchParams();
  const {senderprofile} = useLocalSearchParams();
  const { senderid} = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {messageid} = useLocalSearchParams();
  let unsubscribe;
  const currentuser = pb.authStore.model.id;
  // console.log(`current user from dm:${currentuser}`);
  // console.log(`senderid from dm:${senderid}`);
  const mess = currentuser === senderid ? 'sender' : 'sender1';
  const sendMessage = async () => {
    if (newMessage.trim() === '') {
      console.log('Message is empty. Not sending.');
      notifyMessage('Your message cannot be blank!');
      return; // Return early if the message is empty
   }
    try {
      // const data = {
      //   text: newMessage,
      //   sender: pb.authStore.model.id , senderid,
      //   messageslist: [
      //     {
      //       "sender": currentuser,
      //       "receiver": senderid,
      //       "message": newMessage
      //     },
      //     // Add more messages as the conversation progresses
      //  ]
      // };
      // const createdMessage = await pb.collection('chats').create(data);
      // console.log(`Query: ${messageid}`);
      const existingChat = await pb.collection('chats').getOne(messageid);
      // console.log(`existing user:${JSON.stringify(existingChat)}`);
      if (!existingChat) {
        console.log('No existing chat found between these users.');
        return;
      }
  
      // Step 2: Update the messages list
      const updatedMessagesList = [
        ...existingChat.messageslist,
        {
          sender: currentuser,
          receiver: senderid,
          message: newMessage
        }
      ];
  
      // Update the chat record with the new messages list
      const res = await pb.collection('chats').update(existingChat.id, {
        text: newMessage,
        messageslist: updatedMessagesList
      });
      // console.log(`new messagelist:${JSON.stringify(res,null,2)}`);
      // Optionally, update the local state to reflect the new message
      setNewMessage('');
      setMessages([...messages, { sender: currentuser, receiver: senderid, message: newMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
    // Log the entire error object for more detailed debugging
    console.error('Error details:', error);
    }
 };

 //realtime
 useEffect(() => {
  try {
    console.log("Attempting to subscribe to real-time updates");
    unsubscribe = pb.collection('chats').subscribe('*', function (e) {
      console.log(e.action);
      console.log(e.record);
      fetchInitialMessages();
  }, { /* other options like expand, custom headers, etc. */ });
 
    //  console.log("Successfully subscribed to real-time updates");
  } catch (error) {
     console.error('Error subscribing to real-time updates:', error);
  }
 
  return () => {
    //  console.log("Unsubscribing from real-time updates");
     if (unsubscribe) {
       pb.collection('chats').unsubscribe('*');
     }
  };
 }, []); // Removed 'messages' from the dependency array if it's not necessary
 
 const fetchInitialMessages = async () => {
  try {
    const resultList = await pb.collection('chats').getFullList( {
      sort: 'created',
      expand: 'sender',
    });
 
    const filteredMessages = resultList.filter(item => {
      // Check if the current user is the sender or the receiver
      return item.sender === currentuser || item.sender1 === currentuser;
    });
    const parsedMessages = filteredMessages.flatMap(item => {
      // If messageslist is a JSON string, parse it into an array
      const conversation = typeof item.messageslist === 'string' ? JSON.parse(item.messageslist) : item.messageslist;
      return conversation;
    });

    // console.log(`Parsed messages: ${JSON.stringify(parsedMessages, null, 2)}`);
    setMessages(parsedMessages); 
  } catch (error) {
    console.log('fetch message error',error.code);
  }
};
  useEffect(() => {
    fetchInitialMessages();
 }, []);

 const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  // Here you can call your fetchPosts and fetchuser functions again
  // to refresh the data. Make sure to set refreshing back to false
  // once the data is fetched.
  fetchInitialMessages();
  setRefreshing(false);
}, []);
const scrollViewRef = useRef(null);
// Function to scroll to the bottom of the ScrollView
const scrollToBottom = () => {
  scrollViewRef.current?.scrollToEnd({ animated: true });
};

// Call scrollToBottom after fetching initial messages
useEffect(() => {
  scrollToBottom();
}, [messages]);
// Listen to keyboard events
useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
    // Adjust ScrollView's content inset and offset
    scrollToBottom();
  });

  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    // Reset ScrollView's content inset and offset
    scrollToBottom();
  });

  return () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
}, []);

  return (
    <SafeAreaView className="flex-1">
    <View>
      <View className="flex-row items-center p-4 border-b border-gray-300">
        <TouchableOpacity className="mr-4" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex flex-row items-start justify-start w-[80%]">
          <Image
            className="w-10 h-10 rounded-full"
            source={{ uri: `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${senderid}/${senderprofile}?token=` }}
            resizeMode="cover"
          />
          <Text className="font-semibold pt-2 text-xl ml-4">{sender}</Text>
        </View>
      </View>
      </View>
      <ScrollView
      ref={scrollViewRef}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >
      <View className="flex-1 overflow-y-auto p-4">
        {/* Content goes here */}
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            isOwnMessage={message.sender === currentuser}
            bubbleColor={message.sender === currentuser ? '#94c4f7' : '#1084ff'}
            tailColor={message.sender === currentuser ? '#94c4f7' : '#1084ff'}
            withTail={true}
            onPress={() => console.log("Bubble Pressed!")}
          >
            <Text className="flex flex-wrap">{message.message}</Text>
          </ChatBubble>
        ))}
      </View>
    </ScrollView>
      <View className="flex-row items-center justify-between p-2 z-10">
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
      </SafeAreaView>
  )
}

export default Directmsg