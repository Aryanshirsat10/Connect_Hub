import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Foundation,Feather,Ionicons, AntDesign,MaterialIcons  } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import HeaderLeft from '../components/HeaderLeft';
import pb from '../services/connection';

export default function TabLayout() {
  const [user ,setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const record = await pb.collection('users').getOne(`${pb.authStore.model.id}`);
        console.log(`record:${JSON.stringify(record, null, 2)}`);
        setUser(record);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
 }, []);
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
              <Link href="/screens/messages" asChild>
                <TouchableOpacity>
                <AntDesign name="message1" size={28} color="black" />
                </TouchableOpacity>
              </Link>
            </View>
          ),
          headerLeft: () => (
            <View className="pl-5">
            <Link href="/screens/profile" asChild>
            <TouchableOpacity>
              {/* <Image
                className="w-10 h-10 rounded-full"
                source={{uri:user.avatar}} // Assuming userProfileImage is a URL to the user's profile image
                resizeMode="cover"
              /> */}
              <View className='w-10 h-10 rounded-full bg-slate-500'>
              </View>
              <Text>{user?.id}</Text>
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
