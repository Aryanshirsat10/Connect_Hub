import { View,ScrollView, Text,Image,TouchableOpacity } from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from 'expo-router';
import Post from  '../components/posts';

const index = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack(); // Navigate back
 };
  return (
    <ScrollView>
      <View className="space-y-4 p-1">
        {/* Repeat the following block for each post */}
        <Post/>
        {/* End of post block */}
      </View>
      <View className="space-y-4 p-1">
        {/* Repeat the following block for each post */}
        <Post/>
        {/* End of post block */}
      </View>
    </ScrollView>
  )
}

export default index