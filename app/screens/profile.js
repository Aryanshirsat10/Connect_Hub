import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
 // Sample user data
 const user = {
    name: 'John Doe',
    description: 'Software Developer',
    profilePic: 'https://example.com/path/to/profile/pic.jpg', // Replace with a real image URL
 };

 return (
    <View className="flex-1 items-center justify-center p-5">
      <Image
        className="w-24 h-24 rounded-full mb-5"
        source={{ uri: user.profilePic }}
        resizeMode="cover"
      />
      <Text className="text-xl font-bold mb-2">{user.name}</Text>
      <Text className="text-lg text-center">{user.description}</Text>
    </View>
 );
};

export default ProfileScreen;
