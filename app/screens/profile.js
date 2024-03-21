import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid, Platform,AlertIOS } from 'react-native';
import pb from "../services/connection";
import { useNavigation } from 'expo-router';

const ProfileScreen = () => {
  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }
  const [user1 ,setUser1] = useState({});
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const record = await pb.collection('users').getOne(`${pb.authStore.model.id}`);
        console.log(`record:${JSON.stringify(record, null, 2)}`);
        setUser1(record);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
 }, []);
 // Sample user data
 const user = {
    name: 'John Doe',
    description: 'Software Developer',
    profilePic: `${user1.avatar}`, // Replace with a real image URL
 };
 const handleclick = ()=> {
  const response = pb.authStore.clear();
  console.log(response);
  notifyMessage("Logout successfull");
  console.log("logout successful");
  navigation.navigate("login");
 }
 return (
    <View className="flex-1 items-center justify-center p-5">
      {user1.avatar && (
        <Image
          className="w-24 h-24 rounded-full mb-5"
          source={{ uri: user1.avatar }}
          resizeMode="cover"
        />
      )}
      <Text className="text-xl font-bold mb-2">{user1.username}</Text>
      <Text className="text-lg text-center">{user1.email}</Text>
      <TouchableOpacity className="bg-red-500 p-2" onPress={handleclick}>
        <Text>
          logout
        </Text>
      </TouchableOpacity>
    </View>
 );
};

export default ProfileScreen;
