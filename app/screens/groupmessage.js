import { View, Text,Image, TouchableOpacity, TextInput, ScrollView, RefreshControl,ToastAndroid, Platform, Alert,Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
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
    Alert.alert(msg);
  }
}
const Groupmsg = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [group, setGroup] = useState({});
  const { sender} = useLocalSearchParams();
  const {senderprofile} = useLocalSearchParams();
  const { senderid} = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isMember, setIsMember] = useState(false);

  const {messageid} = useLocalSearchParams();
  let unsubscribe;
  const currentuser = pb.authStore.model.id;
  console.log(`sender from dm:${sender}`);
  const mess = currentuser === senderid ? 'sender' : 'sender1';
  const sendMessage = async () => {
    if (newMessage.trim() === '') {
      console.log('Message is empty. Not sending.');
      notifyMessage('Your message cannot be blank!');
      return; // Return early if the message is empty
    
   }
    // Check if the current user is a member of the group
    if (!isMember) {
        console.log('You are not a member of this group.');
        notifyMessage('You are not a member of this group.');
        return; // Return early if the user is not a member
    }
    const response = await fetch('https://jain3.pythonanywhere.com//check-profanity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any required authentication headers
      },
      body: JSON.stringify({
        text:  newMessage,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.profanity_probability >= 0.2) {
      console.log('Message contains profanity. Not sending.');
      notifyMessage('Message contains profanity. Not sending.');
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
      // const createdMessage = await pb.collection('groups').create(data);
      // console.log(`Query: ${messageid}`);
      const existingChat = await pb.collection('groups').getOne(messageid);
      // console.log(`existing user:${JSON.stringify(existingChat)}`);
      if (!existingChat) {
        console.log('No existing chat found between these users.');
        return;
      }
  
      const messagesList = existingChat.groupmessagelist || [];

      // Step 2: Update the messages list
      const updatedMessagesList = [
        ...messagesList,
        {
          sender: currentuser,
          message: newMessage,
          senderusername: pb.authStore.model.username
        }
      ];
      // Update the chat record with the new messages list
      const res = await pb.collection('groups').update(existingChat.id, {
        text: newMessage,
        groupmessagelist: updatedMessagesList
      });

      // Debugging: Log the response to see its structure
      console.log('Update response:', JSON.stringify(res,null,2));
      // console.log(`new messagelist:${JSON.stringify(res,null,2)}`);
      // Optionally, update the local state to reflect the new message
      setNewMessage('');
      setMessages([...(Array.isArray(messages) ? messages : []), { sender: currentuser, message: newMessage, senderusername: pb.authStore.model.username }]);
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
    unsubscribe = pb.collection('groups').subscribe('*', function (e) {
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
      console.log('Closing subscription');
       pb.collection('groups').unsubscribe('*');
     }
  };
 }, []);
 
 const fetchInitialMessages = async () => {
  try {
    console.log('message id',messageid)
    const resultList = await pb.collection('groups').getOne(messageid,{
    });
    console.log('resultlist:',JSON.stringify(resultList,null,2));

    // console.log(`Parsed messages: ${JSON.stringify(resultList.groupmessagelist, null, 2)}`);
    setMessages(resultList.groupmessagelist); 
    setGroup(resultList);
    const memberCheck = resultList.groupmembers.includes(currentuser);
    setIsMember(memberCheck);
  } catch (error) {
    console.log('fetch message error',error);
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
            source={{ uri: `https://connecthub.pockethost.io/api/files/3fltudul115pos9/${senderid}/${senderprofile}?token=` }}
            resizeMode="cover"
          />
          <TouchableOpacity onPress={() => router.push({pathname: '/screens/groupdetail', params : group})}>
          <Text className="font-semibold pt-2 text-xl ml-4">{sender}</Text>
          </TouchableOpacity>
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
        {messages?.map((message, index) => {
           // Determine if the current message is the last in a series of consecutive messages from the same sender
          const isLastInSeries = index === messages.length - 1 ||
          (messages[index + 1] && messages[index + 1].sender !== message.sender);
          return(
          <ChatBubble
            key={index}
            isOwnMessage={message?.sender === currentuser}
            bubbleColor={message?.sender === currentuser ? '#94c4f7' : '#1084ff'}
            tailColor={message?.sender === currentuser ? '#94c4f7' : '#1084ff'}
            withTail={isLastInSeries}
            onPress={() => console.log("Bubble Pressed!")}
          > 
            <Text className="font-semibold">{message.senderusername}</Text>
            <Text className="flex flex-wrap">{message?.message}</Text>
          </ChatBubble>
          );
        }) || []}
      </View>
    </ScrollView>
      <View className="flex-row items-center justify-between p-2 z-10">
        {isMember ? (<TouchableOpacity className="rounded-full p-3">
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>) :(<></>)}
        {isMember ? (
          <TextInput
            className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-sm"
            placeholder="Message"
            placeholderTextColor="#999"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          ) : (
          <Text className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-sm text-center">
            You are not a member of this group.
          </Text>
          )}
        {isMember ? (
          <TouchableOpacity className="rounded-full p-3" onPress={sendMessage}>
          <Feather name="send" size={24} color="black" />
          </TouchableOpacity>
        ): (
          <></>
        )}
      </View>
      <View className="flex-row justify-between p-2">
        {/* Icon buttons go here */}
      </View>
      </SafeAreaView>
  )
}

export default Groupmsg