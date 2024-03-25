import { View, Text, TextInput, Image, TouchableOpacity,ToastAndroid, Platform, AlertIOS } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import pb from '../services/connection';
import { useState } from 'react';


function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
}

const post = () => {
  const [image, setImage] = useState(null);
  const [postDescription, setPostDescription] = useState('');
  const navigation = useNavigation();
  const handlePress = () =>{
    navigation.navigate('index')
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const createPost = async () => {
    console.log("createPost function called");
    // Prepare the post data
    const data = {
      post_description: postDescription,
      likes: 0, // Initialize likes, saves, and shares
      saves: 0,
      shares: 0,
      userid: pb.authStore.model.id.toString(), // Assuming you have the user's ID
    };
    console.log(data);
    // If an image is selected, append it to the data
    if (image) {
      const formData = new FormData();
      const file = {
        uri: image,
        type: 'multipart/form-data', // Adjust the type based on the image format
        name: 'postImage.jpg', // Adjust the name as needed
      };
      formData.append('postcontent', file);

      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      console.log(data);
      console.log("Before backend call");
      // Send the post data to the backend
      try {
        const record = await pb.collection('posts').create(formData);
          // const record1 = await pb.collection('posts').update(record.id, formData);
          // console.log(record1);
        console.log("After backend call", record);
        console.log('Post created successfully:', record);
        notifyMessage("Post created successfully");
        setPostDescription('');
        setImage(null);
        // Optionally, navigate back or clear the form after a successful post
      } catch (error) {
        console.error('Failed to create post:', error);
      }
    } else {
      // If no image is selected, send the data without the image
      try {
        console.log("Before backend call");
        const record = await pb.collection('posts').create(data);
        console.log('Post created successfully:', record);
        console.log("After backend call", record);
        notifyMessage("Post created successfully");
        setImage(null);
        setPostDescription('');
        // Optionally, navigate back or clear the form after a successful post
      } catch (error) {
        console.error('Failed to create post:', error.data);
      }
    }
 };
  return (
    <View className="flex-1 h-full bg-white">
      <View className="text-black">
        <View className="flex flex-row items-center justify-between px-4 pt-4">
          <TouchableOpacity onPress={handlePress}>
          <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex items-center space-x-2">
            <View className="relative">
              {/* <Image
                className="w-8 h-8 rounded-full"
                source={{ uri: '/placeholder.svg?height=32&width=32' }}
                resizeMode="cover"
              /> */}
              <Text className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">U</Text>
            </View>
            <Text className="text-white">Anyone</Text>
          </View>
          <TouchableOpacity className="bg-gray-300 text-black px-4 py-2 rounded" onPress={createPost}>
            <Text>Post</Text> 
          </TouchableOpacity>
        </View>
        <View className="px-4 py-6">
          <TextInput
            className="bg-transparent placeholder-gray-400"
            placeholder="Share your thoughts..."
            placeholderTextColor="#999"
            onChangeText={setPostDescription}
          />
        </View>
        {image && <Image source={{ uri: image }} className="w-20 h-20 p-5" />}
        </View>
      <View className="absolute bottom-5 left-0 right-0 px-4 py-2 bg-white">
        <View className="flex justify-between w-full flex-row">
          <TouchableOpacity className="bg-gray-200 text-white px-4 py-2 rounded">
            <Text>Rewrite with AI</Text> 
          </TouchableOpacity>
          <View className="flex space-x-4 flex-row">
            <Feather name="camera" size={24} color="black" onPress={pickImage}/>
            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
            <Feather name="plus" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
}

export default post