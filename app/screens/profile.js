import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid, Platform,AlertIOS, ScrollView,RefreshControl } from 'react-native';
import pb from "../services/connection";
import { useNavigation } from 'expo-router';
import UserAvatar from 'react-native-user-avatar';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [profileimg, setProfileImg] = useState(null);
  const [user1 ,setUser1] = useState({});
  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const pickImage1 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [9, 16],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
      const userId = pb.authStore.model.id;
      await updateUserAvatar(userId, result.assets[0].uri);
    }
  };
  const updateUserAvatar = async (userId, imageUri) => {
    try {
      const formData = new FormData();
      // Convert the image URI to a file object
      const file = {
        uri: imageUri,
        type: 'multipart/form-data', // Adjust the type based on the image format
        name: 'avatar.jpg', // Adjust the name as needed
      };
      formData.append('avatar', file);

      // Update the user record with the FormData
      const record = await pb.collection('users').update(userId, formData);
      console.log('User avatar updated successfully:', record);
    } catch (error) {
      console.error('Failed to update user avatar:', error);
    }
 };
  const navigation = useNavigation();
  const fetchUser = async () => {
    try {
      const record = await pb.collection('users').getOne(`${pb.authStore.model.id}`);
      console.log(`record:${JSON.stringify(record, null, 2)}`);
      setUser1(record);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
    //live update for  profile info
    // const userId = pb.authStore.model.id;
    // pb.collection('users').subscribe(userId, function (e) {
    //   console.log(e.action);
    //   console.log(e.record);
    //   setUser1(e.record); // Update the user's profile data
    // }, { /* other options like expand, custom headers, etc. */ });

    // return () => {
    //   pb.collection('users').unsubscribe(userId); // Remove the subscription
    // };
 }, []);
 const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  // Here you can call your fetchPosts and fetchuser functions again
  // Call the function to fetch posts
  fetchUser();
  // to refresh the data. Make sure to set refreshing back to false
  // once the data is fetched.
  setRefreshing(false);
}, []);
 const shouldDisplayAvatar = () => {
  return user1.avatar && user1.avatar.trim() !== '';
};
 const handleclick = ()=> {
  const response = pb.authStore.clear();
  console.log(response);
  notifyMessage("Logout successfull");
  console.log("logout successful");
  navigation.reset({
    index: 0,
    routes: [{ name: 'login' }],
   });
 }
 return (
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >
      <View className="flex flex-col bg-white w-full mx-auto">
      <View className="relative">
        <Image
          className="w-full h-40 object-cover"
          source={require('../../assets/images/background.png')}
          resizeMode="cover"
        />
        <View className="absolute top-1 right-2 bottom-0 flex justify-between p-3">
          {/* <SearchIcon className="text-white" />
          <MoreHorizontalIcon className="text-white" /> */}
          <TouchableOpacity>
            <Feather name="camera" size={24} color="black" onPress={pickImage}/>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </TouchableOpacity>
        </View>
        <View className="absolute top-24 left-[35%] transform -translate-x-1/2 p-1 bg-white rounded-full border-4 border-white">
          {shouldDisplayAvatar() ? (
                <Image
                className="w-24 h-24 rounded-full relative"
                source={{uri : `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${pb.authStore.model.id}/${user1.avatar}?token=`}} // Assuming userProfileImage is a URL to the user's profile image
                resizeMode="cover"
                />
              ) : (
                <UserAvatar size={100} name={user1.username} />
            )}
        </View>
        <TouchableOpacity className="absolute left-60 top-44" onPress={pickImage1}>
        <Feather name="camera" size={24} color="black"/>
        {/* {profileimg && <Image source={{ uri: profileimg }} style={{ width: 200, height: 200 }} />} */}
        </TouchableOpacity>
      </View>
      <View className="pt-16 pb-4 px-4">
        <Text className="text-2xl font-bold">{user1.name}</Text>
        <Text className="text-lg text-gray-600">Student at KJ Somaiya College of Engineering, Vidyavihar&nbsp;&nbsp;
          <Feather name="edit" size={20} color="black"/>
        </Text>
        <Text className="text-md text-gray-600">KJ Somaiya College of Engineering, Vidyavihar</Text>
        <Text className="text-md text-gray-600">Mumbai, Maharashtra, India - 355 connections</Text>
        <View className="mt-3">
          <TouchableOpacity className="mb-2 w-full items-center bg-blue-500 text-white p-2 rounded-lg">
            <Text className="text-white">Open to job opportunities</Text>
            </TouchableOpacity>
          <Text className="text-md text-gray-600">Software Engineer Intern roles</Text>
          <TouchableOpacity className="mt-1 mb-2 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>See all details</Text></TouchableOpacity>
          <TouchableOpacity className="mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>All LinkedIn members</Text></TouchableOpacity>
        </View>
      </View>
      <View className="px-4">
        <Text className="text-lg font-semibold">About</Text>
        <Text className="text-sm text-gray-600">Just an engineering student trying new things</Text>
      </View>
      <View className="mt-4 px-4">
        <Text className="text-lg font-semibold">Featured</Text>
        <TouchableOpacity className="mt-2 mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>Add featured</Text></TouchableOpacity>
      </View>
      <View className="mt-4 px-4 pb-4">
        <View className="flex justify-between">
          <View>
            <Text className="text-lg font-semibold">Private to you</Text>
            <View className="flex mt-2">
              <View className="mr-8">
                <Text className="text-lg font-semibold">12</Text>
                <Text className="text-sm text-gray-600">Who viewed your profile</Text>
              </View>
              <View>
                <Text className="text-lg font-semibold">8</Text>
                <Text className="text-sm text-gray-600">Search appearances</Text>
              </View>
            </View>
          </View>
          {/* <FileEditIcon className="text-gray-600" /> */}
        </View>
      </View>
      <View className="flex w-full items-center">
      <TouchableOpacity className="bg-red-500 p-2 rounded-lg items-center w-4/5" onPress={handleclick}>
         <Text>
           logout
         </Text>
       </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
 );
};

export default ProfileScreen;
