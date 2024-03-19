import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Foundation,Feather,Ionicons, AntDesign  } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Button, TouchableOpacity, View } from 'react-native';
import HeaderLeft from '../components/HeaderLeft';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerTitleAlign: 'center',
      tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ConnectHub',
          tabBarIcon: ({ color }) => <Foundation size={28} name="home" color={color} />,
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
                className="w-10 h-10 rounded-full bg-slate-600"
                source={{ uri: userProfileImage }} // Assuming userProfileImage is a URL to the user's profile image
                resizeMode="cover"
              /> */}
              <View className='w-10 h-10 rounded-full bg-slate-500'> 
              </View>
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
