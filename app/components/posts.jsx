import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import pb from '../services/connection';
const Post = ({ postData }) => {
  console.log(`Post Data: ${JSON.stringify(postData,null,2)}`);
  const currentUserId = pb.authStore.model.id;
  console.log(`current user:${currentUserId}`)
  console.log(`likedby${JSON.stringify(postData.likedby)}`);
  const likedBy = postData.likedby || [];

  // Initialize isHeartFilled based on whether the current user has liked the post
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  useEffect(() => {
     setIsHeartFilled(likedBy.includes(currentUserId));
  }, [likedBy, currentUserId]);
 
  console.log(`hasliked:${isHeartFilled}`);
  // const [isHeartFilled, setIsHeartFilled] = useState(hasLiked || false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(postData.likes || 0);
 
  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }
  const toggleSave = () => {
    setIsSaved(!isSaved);
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

 const baseImageUrl = `https://connecthub.pockethost.io/api/files/1r45sr6hm3dlqvp/${postData?.id}/`;
 
 // Construct the full URL for the first image in the postcontent array
 const imageUrl = postData.postcontent.length > 0 ? `${baseImageUrl}${postData.postcontent[0]}` : null;
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
        <Text className="font-semibold pl-2 capitalize text-lg">{postData.expand?.userid?.username}</Text>
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
            {/* <FlatList
              data={followingUsers}
              renderItem={renderUser}
              keyExtractor={(item) => item.id.toString()}
            /> */}
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
      <TouchableOpacity className="text-sm  border-gray-300 rounded px-2 py-1 mt-2">
        <Text className="font-semibold text-[#007AFF]">Follow</Text>
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
        <View className="bg-white absolute w-40 h-15 top-[88%] flex rounded-lg p-1 pl-2 pt-2">
        <View className=" flex-row w-full justify-between items-center ">
        <TouchableOpacity onPress={toggleHeart}>
          {isHeartFilled ? <FontAwesome name="heart" size={24} color="red" /> : <FontAwesome name="heart-o" size={24} color="black" />}
        </TouchableOpacity>
        <TouchableOpacity>
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
