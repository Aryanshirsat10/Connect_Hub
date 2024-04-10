import React, { useEffect, useState } from 'react'
import { View, Text,Image, TouchableOpacity, TextInput, ScrollView, RefreshControl,Modal,FlatList} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link,router,useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import MessageCard from '../../components/MessageCard';
import pb from '../../services/connection';
import GroupCard from '../../components/GroupCard';
   
const messages = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [messageslist,setMessagesList]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [grouplist,setGroupList] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const currentuser = pb.authStore.model.id;
  const followingUserIds = pb.authStore.model.Following;
  const [followingUsers, setFollowingUsers] = useState([]);

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }

  const fetchmessagelist = async() =>{
    console.log(currentuser);
    try {
      const records = await pb.collection('chats').getFullList({
        sort: '-created',
        expand: 'sender,sender1'
    });
    // console.log(`messagelist${JSON.stringify(records,null,2)}`);


    const enhancedMessages = await Promise.all(records.map(async (record) => {
      if (record.receiver) {
        try {
          const receiverName = await pb.collection('users').getOne(`${record.receiver}`);
          return { ...record, receiverUser: receiverName };
        } catch (error) {
          console.log(error);
          return record; // Return the original record if there's an error
        }
      }
      return record; // Return the original record if there's no receiver
    }));
    console.log(`enhancedmessage:${JSON.stringify(enhancedMessages,null,2)}`);
    setMessagesList(enhancedMessages);
    } catch (error) {
      console.log(error);
    }
  }
  const filteredMessages = messageslist.filter(message => {
    const senderUsername = message.expand?.sender?.username || '';
    const sender1Username = message.expand?.sender1?.username || '';
    const searchTermLower = searchTerm.toLowerCase();

    // Check if the search term matches either sender or sender1 username
    const matchesSearchTerm = senderUsername.includes(searchTermLower) || sender1Username.includes(searchTermLower);

    // Check if there is an existing chat between the current user and the user matching the search term
    const hasChatWithUser = (user) => {
      return messageslist.some(chat => 
        (chat.expand?.sender?.username === user.username || chat.expand?.sender1?.username === user.username) &&
        (chat.expand?.sender?.username === currentuser || chat.expand?.sender1?.username === currentuser)
      );
    };

    // Only include the message if it matches the search term and there is an existing chat with the user
    return matchesSearchTerm || hasChatWithUser({ username: searchTermLower });
 });


  //check if the chats already exists
  const checkIfChatExists = async (currentUserId, selectedUserId) => {
    try {
      console.log(selectedUserId);
      const records = await pb.collection('chats').getFullList({
        sort: '-created',
    });
    const filteredResults = records.filter(chat => (chat.sender === selectedUserId && chat.sender1 === currentUserId) || (chat.sender === currentUserId && chat.sender1 === selectedUserId));
       // If any chats are found, return the first one
       if (filteredResults.length > 0) {
         return filteredResults[0];
       }
   
       return null;
    } catch (error) {
       console.error('Error checking for existing chat:', error);
       if(error.data.code == 400){
        return null;
       }
       return null;
    }
   };
   
   //navigating to the selected page
   const openChat = async(id,selectedUserId,currentUserId) => {
    try {
      const record = await pb.collection('users').getOne(selectedUserId);
      console.log('record from open chat function',record)
      router.push({pathname: '/screens/directmessage', params : {sender: record?.username , senderprofile: record?.avatar, senderid: record?.id, currentuser: currentUserId, messageid:id}})
    } catch (error) {
      
    }
    
   };
   const handleItemClick = async (selectedUserId) => {
    const currentUserId = pb.authStore.model.id;
    const existingChat = await checkIfChatExists(currentUserId, selectedUserId);
   
    if (existingChat) {
       // If an existing chat is found, open it
       openChat(existingChat.id,selectedUserId,currentUserId);
    } else {
       // If no existing chat is found, create a new one
       const newChatData = {
         sender: currentUserId,
         sender1: selectedUserId,
         text: "Say hii👋", // Or whatever initial message you want
         messageslist: JSON.stringify([]), // Start with an empty messages list
       };
       const newChat = await pb.collection('chats').create(newChatData);
       openChat(newChat.id,selectedUserId,currentUserId);
    }
   };
   
  useEffect(()=>{
    fetchmessagelist();
  },[]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Here you can call your fetchPosts and fetchuser functions again
    // to refresh the data. Make sure to set refreshing back to false
    // once the data is fetched.
    fetchmessagelist();
    setRefreshing(false);
  }, []);
  useEffect(()=>{
    //fetch users
    const fetchFollowingUsersDetails = async () => {
      try {
        // Assuming you have an API endpoint to fetch user details by ID
        console.log('following',followingUserIds);
        const userDetailsPromises = followingUserIds.map(async (userId) => {
          const response = await pb.collection('users').getOne(userId);
          return response;
        });
  
        const userDetails = await Promise.all(userDetailsPromises);
        setFollowingUsers(userDetails);
      } catch (error) {
        console.error('Failed to fetch following users details:', error);
      }
    };
      fetchFollowingUsersDetails();
   }, [followingUserIds]);
  const renderUser = ({ item }) => {
    // Check if the item is defined and has the necessary properties
    if (item && item?.id && item?.avatar) {
       return (
        <TouchableOpacity
        key={item.id}
        className="flex flex-row  items-center my-2"
        onPress={() => handleItemClick(item.id)} // Call handleItemClick when the item is clicked
      >
        <Image
          source={{ uri: `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${item.id}/${item.avatar}` }}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
        <Text>{item.username}</Text>
      </TouchableOpacity>
       );
    } else {
       // Optionally, you can return a fallback view or null if the item is not defined or missing properties
       return null;
    }
   };
  return (
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >
    <View className="bg-white">
        <View className="flex-row items-center justify-between border-t border-gray-300 p-2">
        <View className="flex-row bg-gray-200 rounded-full w-[90%] mr-0">
          <TouchableOpacity className="rounded-full p-3 pr-0">
              <Feather name="search" size={24} color="grey" />
          </TouchableOpacity>    
          <TextInput
            className="flex-1 rounded-full bg-gray-200 px-4 py-2 text-sm"
            placeholder="Message"
            placeholderTextColor="#999"
            onChangeText={text => setSearchTerm(text)}
            autoCapitalize='none'
          />
        </View>
        <TouchableOpacity className="rounded-full py-2" onPress={toggleModel}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModelOpen}
        onRequestClose={toggleModel}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-4/5 bg-white rounded-lg p-4">
            <Text className="text-xl font-bold text-center mb-4">Chat</Text>
            <FlatList
              data={followingUsers}
              renderItem={renderUser}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity onPress={toggleModel} className="self-center mt-4 bg-gray-200 w-full p-2 rounded-lg items-center">
              <Text className="font-semibold text-blue-600 text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> 
      {/* <Text className="font-semibold text-lg px-4 border-b border-gray-300">DM's</Text> */}
      {filteredMessages.length === 0 ? (
        <Text className="text-lg font-medium p-2 text-gray-700 flex w-full text-center">No users found</Text>
      ) : (
        filteredMessages.filter(message => currentuser === message.sender || currentuser === message.sender1).map((message) => (
        <MessageCard
          key={message.id}
          content={message.text}
          sender={currentuser === message.sender ? message.expand?.sender1 : message.expand?.sender}
          timestamp={message.updated}
          currentuser = {currentuser}
          id={message.id}
        />
        )
      ))}
    </View>
    </ScrollView>
  )
}

export default messages