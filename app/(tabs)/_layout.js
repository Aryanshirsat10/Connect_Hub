import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Foundation,Feather,Ionicons, AntDesign,MaterialIcons  } from '@expo/vector-icons';
import { Link, Tabs, router} from 'expo-router';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import pb from '../services/connection';

export default function TabLayout() {
  const [user ,setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
        setUser(pb.authStore.model);
    };

    fetchUser();
    // const userId = pb.authStore.model.id;
    // pb.collection('users').subscribe(userId, function (e) {
    //   console.log(e.action);
    //   console.log(e.record);
    //   setUser(e.record); // Update the user's profile data
    // }, { /* other options like expand, custom headers, etc. */ });

    // return () => {
    //   pb.collection('users').unsubscribe(userId); // Remove the subscription
    // };
 }, []);
  // Log the updated user state
  useEffect(() => {
    console.log(`user:${JSON.stringify(user.avatar, null, 2)}`);
 }, [user]); // This effect depends on the user state
 const shouldDisplayAvatar = () => {
  return user.avatar && user.avatar.trim() !== '';
};

  return (
    <Tabs screenOptions={{ 
      headerTitleAlign: 'center',
      tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ConnectHub',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused,color }) => {
            // Use the focused state to decide which icon to show
            if (focused) {
              // Return the filled icon when the tab is selected
              return <Foundation size={28} name="home" color={color} />;
            } else {
              // Return the outlined icon when the tab is not selected
              // Assuming you have an outlined icon named "home-outline" in the Foundation icon set
              return <AntDesign size={28} name="home" color={color} />;
            }
          },
          headerRight: () => (
            <View className="pr-5">
              {/* <Link href="/screens/messages" asChild> */}
                <TouchableOpacity onPress={() => router.push({pathname: '/screens/(toptabs)/messages', params : {currentuser: user}})}>
                <AntDesign name="message1" size={28} color="black" />
                </TouchableOpacity>
              {/* </Link> */}
            </View>
          ),
          headerLeft: () => (
            <View className="pl-5">
            <Link href="/screens/profile" asChild>
            <TouchableOpacity>
            {shouldDisplayAvatar() ? (
              <Image
                className="w-10 h-10 rounded-full"
                source={{uri : `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${pb.authStore.model.id}/${user.avatar}?token=`}} // Assuming userProfileImage is a URL to the user's profile image
                resizeMode="cover"
              />
              ) : (
                <UserAvatar size={40} name={user.username} />
              )}
              {/* <View className='w-10 h-10 rounded-full bg-slate-500'>
              </View> */}
              {/* <Text>{user?.id}</Text> */}
            </TouchableOpacity>
            </Link>
          </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Feather size={28} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus-square-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Network',
          tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <FontAwesome  size={28} name="briefcase" color={color} />,
        }}
      />
    </Tabs>
  );
}
