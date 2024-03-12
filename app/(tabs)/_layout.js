import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Foundation,Feather,Ionicons  } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

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
          title: 'Post',
          tabBarIcon: ({ color }) => <Feather size={28} name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <Ionicons  size={28} name="bag-handle-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
