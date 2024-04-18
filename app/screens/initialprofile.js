import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid, Platform,Alert, ScrollView,RefreshControl } from 'react-native';
import pb from "../services/connection";
import { router, useNavigation } from 'expo-router';
import UserAvatar from 'react-native-user-avatar';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExperienceCard from '../components/ExperienceCard';
import SkillCard from '../components/SkillCard';
import EducationCard from '../components/EducationCard';
import ContactCard from '../components/ContactCard';

const initialprofile = () => {
  const currentuser = pb.authStore.model;
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [profileimg, setProfileImg] = useState(null);
  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      Alert.alert(msg);
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
      const userId = pb.authStore.model.id;
      await updateCover(userId, result.assets[0].uri);
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
  //format date
  function formatDate(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);
    
    // Array of month names
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    
    // Extract the month and year from the Date object
    const month = monthNames[date.getMonth()]; // getMonth() returns month index starting from 0
    const year = date.getFullYear(); // getFullYear() returns the year
    
    // Return the formatted date string
    return `${month} ${year}`;
}
const updateCover = async (userId, imageUri) => {
  try {
    const formData = new FormData();
    // Convert the image URI to a file object
    const file = {
      uri: imageUri,
      type: 'multipart/form-data', // Adjust the type based on the image format
      name: 'cover.jpg', // Adjust the name as needed
    };
    formData.append('cover', file);

    // Update the user record with the FormData
    const record = await pb.collection('users').update(userId, formData);
    console.log('User cover updated successfully:', record);
  } catch (error) {
    console.error('Failed to update user avatar:', error);
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
 const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  // Here you can call your fetchPosts and fetchuser functions again
  // Call the function to fetch posts
  // fetchUser();
  // to refresh the data. Make sure to set refreshing back to false
  // once the data is fetched.
  setRefreshing(false);
}, []);
 const shouldDisplayAvatar = () => {
  return currentuser.avatar && currentuser.avatar.trim() !== '';
};
const shouldcover = () => {
  return currentuser.cover && currentuser.cover.trim() !== '';
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
 console.log(pb.authStore.model);

 return (
  <SafeAreaView>
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >
      <View className="flex flex-col bg-white w-full mx-auto relative">
      <TouchableOpacity className="left-3 top-3 absolute z-10 bg-slate-300 rounded-full w-fit" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="black" />
        </TouchableOpacity>
      <View className="relative">
      {/* {shouldcover() ? ( */}
        {/* <Image
          className="w-full h-30 object-cover"
          source={{uri : `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${pb.authStore.model.id}/${currentuser.cover}?token=`}}
          resizeMode="cover"
          onError={() => console.log('Failed to load image')}
        />
      ) : ( */}
        <Image
        className="w-full h-30 object-cover"
        source={require('../../assets/images/background.png')}
          resizeMode="cover"
        />
    {/* )} */}
        <View className="absolute top-1 right-2 bottom-0 flex justify-between p-3">
          <TouchableOpacity>
            <Feather name="camera" size={24} color="black" onPress={pickImage}/>
          </TouchableOpacity>
        </View>
        <View className="absolute top-24 left-[5%] transform -translate-x-1/2 p-1 bg-white rounded-full border-4 border-white">
          {shouldDisplayAvatar() ? (
                <Image
                className="w-24 h-24 rounded-full relative"
                source={{uri : `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${pb.authStore.model.id}/${currentuser.avatar}?token=`}} // Assuming userProfileImage is a URL to the user's profile image
                resizeMode="cover"
                />
              ) : (
                <UserAvatar size={100} name={currentuser.username} />
            )}
        </View>
        <TouchableOpacity className="absolute left-32 top-44" onPress={pickImage1}>
        <Feather name="camera" size={24} color="black"/>
        {/* {profileimg && <Image source={{ uri: profileimg }} style={{ width: 200, height: 200 }} />} */}
        </TouchableOpacity>
      </View>
      <View className="pt-16 pb-4 px-4">
        <Text className="text-2xl font-bold">{currentuser.name}</Text>
        <Text className="text-lg font-semibold text-gray-500">@{currentuser.username}</Text>
        {/* <Text className="text-lg text-gray-600">Student at KJ Somaiya College of Engineering, Vidyavihar&nbsp;&nbsp;
          <Feather name="edit" size={20} color="black"/>
        </Text>
        <Text className="text-md text-gray-600">KJ Somaiya College of Engineering, Vidyavihar</Text>
        <Text className="text-md text-gray-600">Mumbai, Maharashtra, India - 355 connections</Text> */}
        {/* <View className="mt-3">
          <TouchableOpacity className="mb-2 w-full items-center bg-blue-500 text-white p-2 rounded-lg">
            <Text className="text-white">Open to job opportunities</Text>
            </TouchableOpacity>
          <Text className="text-md text-gray-600">Software Engineer Intern roles</Text>
          <TouchableOpacity className="mt-1 mb-2 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>See all details</Text></TouchableOpacity>
          <TouchableOpacity className="mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>All LinkedIn members</Text></TouchableOpacity>
        </View> */}
        <Text className="text-lg font-medium text-gray-500">Just an engineering student trying new things</Text>
      </View>
      <View className="px-4">
        <Text className="text-lg font-semibold"><Ionicons name="calendar-outline" size={18} color="black" /> Joined {formatDate(currentuser.created)}</Text>
      </View>
      <View className="mt-4 px-4">
        <Text className="text-lg font-semibold">Experience</Text>
        {/* <TouchableOpacity className="mt-2 mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>Add Experience</Text></TouchableOpacity> */}
        <ExperienceCard/>
      </View>
      <View className="mt-4 px-4">
        <Text className="text-lg font-semibold">Skills</Text>
        {/* <TouchableOpacity className="mt-2 mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>Add Skiils</Text></TouchableOpacity> */}
        <SkillCard/>
      </View>
      <View className="mt-4 px-4">
        <Text className="text-lg font-semibold">Education</Text>
        {/* <TouchableOpacity className="mt-2 mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>Add Education</Text></TouchableOpacity> */}
        <EducationCard/>
      </View>
      <View className="mt-4 px-4">
        <Text className="text-lg font-semibold">Contact</Text>
        {/* <TouchableOpacity className="mt-2 mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>Add Contact</Text></TouchableOpacity> */}
        <ContactCard/>
      </View>
      {/* <View className="mt-4 px-4 pb-4">
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
          {/* <FileEditIcon className="text-gray-600" /> 
        </View>
      </View> */}
      <View className="flex w-full items-center">
      <TouchableOpacity className="bg-red-500 p-2 rounded-lg items-center w-4/5" onPress={handleclick}>
         <Text>
           logout
         </Text>
       </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
 );
};

export default initialprofile;
