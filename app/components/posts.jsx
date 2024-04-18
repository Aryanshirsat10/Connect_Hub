import React, { useEffect, useState,useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, FlatList, Alert} from 'react-native';
import { BottomSheetModal, useBottomSheetModal,BottomSheet } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from './CustomBottomSheetModal';
import CustomBottomSheet from './CustomBottomSheet';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {router} from 'expo-router';
import pb from '../services/connection';
const Post = ({ postData }) => {
  const bottomSheetRef = useRef(null);
	const [title, setTitle] = useState('Passing my data 🔥');

  console.log(`Post Data: ${JSON.stringify(postData,null,2)}`);
  const currentUserId = pb.authStore.model.id;
  console.log(`current user:${currentUserId}`)
  console.log(`likedby${JSON.stringify(postData.likedby)}`);
  const likedBy = postData.likedby || [];
  const savedBy = postData.savedby || [];
  // console.log(JSON.stringify(postData,null,2));
  const connectionUserIds = pb.authStore.model.Connections;
  const [followingUsers, setFollowingUsers] = useState([]);
  // Initialize isHeartFilled based on whether the current user has liked the post
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  useEffect(() => {
     setIsHeartFilled(likedBy.includes(currentUserId));
     setIsSaved(savedBy.includes(currentUserId));
  }, [likedBy, currentUserId, savedBy]); 
  console.log(`hasliked:${isHeartFilled}`);
  // const [isHeartFilled, setIsHeartFilled] = useState(hasLiked || false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(postData.likes || 0);
  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }
  const toggleSave = async() => {
    const hasSaved = postData.savedby.includes(currentUserId);
    setIsSaved(!isSaved);
    let newSavedBy = hasSaved ? postData.savedby.filter(id => id !== currentUserId) : [...postData.savedby, currentUserId];


    try {
      const data = {
        savedby: newSavedBy, // Update only the saves field
      };
      const response = await pb.collection('posts').update(postData?.id, data);
      console.log(response);
      console.log('saves updated successfully');
   } catch (error) {
      console.error('Failed to update saves:', error);
   }
  }
  const toggleHeart = async() => {
    const hasLiked = postData.likedby.includes(currentUserId);
    setIsHeartFilled(!isHeartFilled);
    // if (isHeartFilled) {
    //   // If the heart was filled, decrease the likes count
    //   setLikesCount(prevCount => prevCount - 1);
    // } else {
    //   // If the heart was not filled, increase the likes count
    //   setLikesCount(prevCount => prevCount + 1);
    // }
    // setIsHeartFilled(!hasLiked);
    let newLikesCount = isHeartFilled ? likesCount - 1 : likesCount + 1;
    setLikesCount(newLikesCount);

    let newLikedBy = hasLiked ? postData.likedby.filter(id => id !== currentUserId) : [...postData.likedby, currentUserId];


    try {
      const data = {
        likes: newLikesCount,
        likedby: newLikedBy, // Update only the likes field
      };
      const response = await pb.collection('posts').update(postData?.id, data);
      console.log(response);
      console.log('Likes updated successfully');
   } catch (error) {
      console.error('Failed to update likes:', error);
   }
 };
 // Determine if the current user is already connected with the post user
const isAlreadyConnected = connectionUserIds.includes(postData.expand.userid.id);
 const handleConnect = async () => {
  if (postData.userid === pb.authStore.model.id) {
    // Optionally, you can provide feedback to the user that they cannot connect with themselves
    console.log("You cannot connect with yourself");
    Alert.alert("You cannot connect with yourself");
    return;
  }
  if(isAlreadyConnected){
    const record = await pb.collection('users').getOne(postData.expand.userid.id);
    const updateData = {
      ...record,
      Connections: record["Connections"].filter(ConnectionId => ConnectionId !== pb.authStore.model.id),
    };
    // console.log(user1.id);
    console.log(JSON.stringify(updateData));

    const updateData1 = {
      ...pb.authStore.model,
      Connections: pb.authStore.model["Connections"].filter(ConnectionId => ConnectionId !== postData.expand.userid.id),
    };
    console.log(JSON.stringify(updateData1));

    await pb.collection('users').update(postData.expand.userid.id, updateData);
    await pb.collection('users').update(pb.authStore.model.id, updateData1);
    console.log("Disconnected successfully");
  }
  const existingRequest = await checkExistingConnectionRequest();
  if (existingRequest) {
    console.log("Connection request already exists");
    Alert.alert("Connection request already exists");
    return;
    // Optionally, you can handle this case as per your requirement
  }
  try {
    // Make a POST request to connect the current user with the post user
    const data = {
      "from": currentUserId,
      "to": postData.expand.userid.id
    };
  
  const record = await pb.collection('connectionrequests').create(data);
  console.log(record);
  console.log("Connection request added successfully")
  } catch (error) {
    console.error('Failed to connect:', error);
  }
};

const checkExistingConnectionRequest = async () => {
  try {
      // Check if there's a connection request from the current user to the post user
      const querySnapshot = await pb.collection('connectionrequests').getFirstListItem(`to='${postData.userid}'`);
      if (!querySnapshot.empty) {
          // If a connection request exists, return true
          return true;
      }
      return false;
  } catch (error) {
      console.error('Failed to check existing connection request:', error);
      return false;
  }
};
//  useEffect(()=>{
//   //fetch users
//   const fetchFollowingUsersDetails = async () => {
//     try {
//       // Assuming you have an API endpoint to fetch user details by ID
//       console.log('following',followingUserIds);
//       const userDetailsPromises = followingUserIds.map(async (userId) => {
//         const response = await pb.collection('users').getOne(userId);
//         return response.data;
//       });

//       const userDetails = await Promise.all(userDetailsPromises);
//       setFollowingUsers(userDetails);
//     } catch (error) {
//       console.error('Failed to fetch following users details:', error);
//     }
//   };
//     fetchFollowingUsersDetails();
//  }, []);
 const baseImageUrl = `https://connecthub.pockethost.io/api/files/1r45sr6hm3dlqvp/${postData?.id}/`;
 
 // Construct the full URL for the first image in the postcontent array
 const imageUrl = postData.postcontent.length > 0 ? `${baseImageUrl}${postData.postcontent[0]}` : null;
 const renderUser = ({ item }) => {
  // Check if the item is defined and has the necessary properties
  if (item && item.id && item.avatar) {
     return (
       <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
         <Image
           source={{ uri: `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${item.id}/${item.avatar}` }}
           style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
         />
         <Text>{item.username}</Text>
       </View>
     );
  } else {
     // Optionally, you can return a fallback view or null if the item is not defined or missing properties
     return null;
  }
 };
 return (
    <View className="flex flex-col items-start justify-between p-4 rounded-lg bg-white w-full relative">
        {/* <View className="flex justify-between w-full"> */}
        <View className="flex flex-row items-center space-y-2">
        {/* User Image */}
        <Image
          className="w-10 h-10 rounded-full"
          source={{uri: `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${postData.expand?.userid?.id}/${postData.expand?.userid?.avatar}?token=`}}
        />
        {/* Username */}
        <View className="flex flex-col mr-7">
        <TouchableOpacity onPress={() => router.push({pathname: '/screens/userprofile', params : postData.expand.userid})}>
        <Text className="font-semibold pl-2 capitalize text-lg">{postData.expand?.userid?.username}</Text>
        </TouchableOpacity>
        {/* User Description */}
        <Text className="text-sm text-gray-500">Software engineering student</Text>
        </View>
        <TouchableOpacity onPress={toggleModel}>
        <Ionicons name="share-outline" size={32} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity className="ml-4" onPress={toggleSave}>
        {isSaved ? <FontAwesome name="bookmark" size={32} color="black"/> : <FontAwesome name="bookmark-o" size={32} color="black"/>}
        </TouchableOpacity>
        {/* <Image className="w-8 h-8  ml-5" source={require('../../assets/images/bookmark.png')}/> */}
        {/* </View> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModelOpen}
        onRequestClose={toggleModel}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-4/5 bg-white rounded-lg p-4">
            <Text className="text-xl font-bold text-center mb-4">Share with:</Text>
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
      <View className="flex flex-row justify-between items-center w-full">
        {/* Post Description */}
      <Text className="text-sm text-gray-500 mt-4">{postData.post_description}</Text>
      {/* Follow Button */}
      <TouchableOpacity className="text-sm  border-gray-300 rounded px-2 py-1 mt-2" onPress={handleConnect}>
        <Text className="font-semibold text-[#007AFF]">{isAlreadyConnected ? 'Disconnect' : 'Connect'}</Text>
      </TouchableOpacity>
      </View>
      <View className="flex flex-col justify-center items-center w-full h-80 mt-8 mb-4">
        {imageUrl && (
            <Image
            className="w-[340px] h-[320px] rounded-lg justify-center"
            source={{uri : imageUrl}} // Assuming userProfileImage is a URL to the user's profile image
            resizeMode="cover"
          />
        )}
        {/* Likes and Comments*/}
        <View className="bg-white absolute w-40 h-15 top-[90%] flex rounded-lg p-1 pl-2 pt-2">
        <View className=" flex-row w-full justify-between items-center ">
        <TouchableOpacity onPress={toggleHeart}>
          {isHeartFilled ? <FontAwesome name="heart" size={24} color="red" /> : <FontAwesome name="heart-o" size={24} color="black" />}
        </TouchableOpacity>
        {/* <CustomBottomSheetModal ref={bottomSheetRef} /> */}
        {/* <CustomBottomSheet ref={bottomSheetRef} title={title} /> */}
        <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
          <FontAwesome6 name="comment" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
        </View>
        <View className="w-full flex flex-row gap-7">
          <Text className="text-sm text-gray-500">{likesCount} likes</Text>
          <Text className="text-sm text-gray-500"></Text>
        </View>
        </View>
      </View>
    </View>
 );
};

export default Post;
