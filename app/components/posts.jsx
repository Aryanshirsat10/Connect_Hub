import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const Post = () => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }
  const toggleSave = () => {
    setIsSaved(!isSaved);
  }
  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
 };

 return (
    <View className="flex flex-col items-start justify-between p-4 rounded-lg bg-white w-full relative">
        {/* <View className="flex justify-between w-full"> */}
        <View className="flex flex-row items-center space-y-2">
        {/* User Image */}
        <Image
          className="w-10 h-10 rounded-full"
          source={require('../../assets/images/favicon.png')}
        />
        {/* Username */}
        <View className="flex flex-col mr-10">
        <Text className="font-semibold">Jane Copper</Text>
        {/* User Description */}
        <Text className="text-sm text-gray-500">Software engineering student</Text>
        </View>
        <TouchableOpacity>
        <Ionicons name="share-outline" size={32} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity className="ml-5" onPress={toggleSave}>
        {isSaved ? <FontAwesome name="bookmark" size={32} color="black"/> : <FontAwesome name="bookmark-o" size={32} color="black"/>}
        </TouchableOpacity>
        {/* <Image className="w-8 h-8  ml-5" source={require('../../assets/images/bookmark.png')}/> */}
        {/* </View> */}
      </View>
      <View className="flex flex-row justify-between items-center w-full">
        {/* Post Description */}
      <Text className="text-sm text-gray-500 mt-4">Description about the post</Text>
      {/* Follow Button */}
      <TouchableOpacity className="text-sm  border-gray-300 rounded px-2 py-1 mt-2">
        <Text className="font-semibold text-[#007AFF]">Follow</Text>
      </TouchableOpacity>
      </View>
      <View className="flex flex-col justify-center items-center w-full h-80 mt-8 mb-4">
      <Image
          className="w-[340px] h-[320px] rounded-lg justify-center"
          source={require('../../assets/images/post.jpg')}
        />
        {/* Likes and Comments*/}
        <View className="bg-white absolute w-28 h-10 top-[94%] flex flex-row p-1 pl-2 justify-between items-center rounded-lg">
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
      </View>
    </View>
 );
};

export default Post;
