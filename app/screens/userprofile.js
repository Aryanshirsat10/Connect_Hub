import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid, Platform,Alert, ScrollView,RefreshControl } from 'react-native';
import pb from "../services/connection";
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import UserAvatar from 'react-native-user-avatar';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const user = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [connections,setConnections] = useState(0);
  const [followers,setFollowers] = useState(0);
  const [following,setFollowing] = useState(0);
  const [user1 ,setUser1] = useState({});
  console.log(user);
  let unsubscribe;
  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      Alert.alert(msg);
    }
  }
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

  const navigation = useNavigation();
  const fetchUser = async () => {
    //   try {
    //     const record = await pb.collection('users').getOne(user);
    //     setUser1(record);
    //     getUserCounts(record);
    //   } catch (error) {
    //     console.log('error fetching user:',error)
    //   }
    setUser1(user);
    getUserCounts(user);
  };
  useEffect(() => {
    fetchUser();
 }, []);
  
 //live update for  profile info
 useEffect(() => {
  const userId = user.id;
    try {
      console.log("Attempting to subscribe to real-time updates");
      unsubscribe = pb.collection('users').subscribe(userId, function (e) {
        console.log(e.action);
        console.log(e.record);
        setUser1(e.record); // Update the user's profile data
      }, { /* other options like expand, custom headers, etc. */ }); 
    } catch (error) {
      console.log(error);
    }
    return () => {
      if (unsubscribe) {
        console.log('Closing subscription');
         pb.collection('users').unsubscribe(userId);
       }
    };
 }, [])
 
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

 function getUserCounts(userData) {
  // Initialize an object to hold the counts
  const counts = {
      connections: 0,
      followers: 0,
      following: 0
  };

  // Check if the user has connections and count them
  if (userData.Connections) {
    counts.connections = userData.Connections.split(',').length;
}

// Check if the user has followers and count them
if (userData.Followers) {
    counts.followers = userData.Followers.split(',').length;
}

// Check if the user is following others and count them
if (userData.Following) {
    counts.following = userData.Following.split(',').length;
}

  setConnections(counts.connections);
  setFollowers(counts.followers);
  setFollowing(counts.following);
}

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
        <Image
          className="w-full h-30 object-cover"
          source={require('../../assets/images/background.png')}
          resizeMode="cover"
        />
        <View className="absolute top-1 right-2 bottom-0 flex justify-between p-3">
          {/* <SearchIcon className="text-white" />
          <MoreHorizontalIcon className="text-white" /> */}
        </View>
        <View className="absolute top-24 left-[5%] transform -translate-x-1/2 p-1 bg-white rounded-full border-4 border-white">
          {shouldDisplayAvatar() ? (
                <Image
                className="w-24 h-24 rounded-full relative"
                source={{uri : `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${user.id}/${user1.avatar}?token=`}} // Assuming userProfileImage is a URL to the user's profile image
                resizeMode="cover"
                />
              ) : (
                <UserAvatar size={100} name={user1.username} />
            )}
        </View>
      </View>
      <View className="pt-16 pb-4 px-4">
        <Text className="text-2xl font-bold">{user1.name}</Text>
        <Text className="text-lg font-semibold text-gray-500">@{user1.username}</Text>
        <Text className="text-lg font-medium text-gray-500">Just an engineering student trying new things</Text>
      </View>
      <View className="px-4">
        <Text className="text-lg font-semibold"><Ionicons name="calendar-outline" size={18} color="black" /> Joined {formatDate(user1.created)}</Text>
      </View>
      <View className="mt-4 px-4 flex flex-row gap-x-3">
        <View className="flex flex-row gap-x-1">
        <Text className="text-lg font-semibold">{connections}</Text>
        <Text className="text-lg font-medium text-gray-500">Connections</Text>
        </View>
        <View className="flex flex-row gap-x-1">
        <Text className="text-lg font-semibold">{following}</Text>
        <Text className="text-lg font-medium text-gray-500">Following</Text>
        </View>
        <View className="flex flex-row gap-x-1">
        <Text className="text-lg font-semibold">{followers}</Text>
        <Text className="text-lg font-medium text-gray-500">Followers</Text>
        </View>
      </View>
      <View className="mt-4 px-4">
        <Text className="text-lg font-semibold">Experience</Text>
        <TouchableOpacity className="mt-2 mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>Add Experience</Text></TouchableOpacity>
      </View>
      <View className="mt-4 px-4">
        <Text className="text-lg font-semibold">Skills</Text>
        <TouchableOpacity className="mt-2 mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>Add Skiils</Text></TouchableOpacity>
      </View>
      <View className="mt-4 px-4">
        <Text className="text-lg font-semibold">Education</Text>
        <TouchableOpacity className="mt-2 mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>Add Education</Text></TouchableOpacity>
      </View>
      <View className="mt-4 px-4">
        <Text className="text-lg font-semibold">Contact</Text>
        <TouchableOpacity className="mt-2 mb-4 w-full bg-gray-100 text-gray-800 p-2 rounded-lg"><Text>Add Contact</Text></TouchableOpacity>
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
    </SafeAreaView>
 );
};

export default ProfileScreen;
