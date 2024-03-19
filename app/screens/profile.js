import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import pb from "../services/connection";
import { useNavigation } from 'expo-router';

const ProfileScreen = () => {
  const navigation = new useNavigation();
 // Sample user data
 const user = {
    name: 'John Doe',
    description: 'Software Developer',
    profilePic: 'https://example.com/path/to/profile/pic.jpg', // Replace with a real image URL
 };
 const handleclick = ()=> {
  const response = pb.authStore.clear();
  console.log(response);
  console.log("logout successful");
  navigation.navigate("login");
 }
 return (
    <View className="flex-1 items-center justify-center p-5">
      <Image
        className="w-24 h-24 rounded-full mb-5"
        source={{ uri: user.profilePic }}
        resizeMode="cover"
      />
      <Text className="text-xl font-bold mb-2">{user.name}</Text>
      <Text className="text-lg text-center">{user.description}</Text>
      <TouchableOpacity className="bg-red-500 p-2" onPress={handleclick}>
        <Text>
          logout
        </Text>
      </TouchableOpacity>
    </View>
 );
};

export default ProfileScreen;
