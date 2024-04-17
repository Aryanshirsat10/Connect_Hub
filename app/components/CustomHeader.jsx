import React from 'react';
import { View, Text, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();
 return (
    <View className="flex flex-row justify-center items-center p-4 bg-gray-50 border-b border-gray-200 h-14 w-full shadow-lg relative">
      <TouchableOpacity className="rounded-full absolute top-5 left-3" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="black" />
      </TouchableOpacity>
      <View className="flex w-full items-center">
      <Text className="text-lg font-bold">{title}</Text>
      </View>
    </View>
 );
};

export default CustomHeader;