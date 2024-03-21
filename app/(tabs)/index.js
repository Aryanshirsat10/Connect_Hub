import { View,ScrollView, Text,Image,TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from 'expo-router';
import Post from  '../components/posts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import pb from '../services/connection';

const index = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack(); // Navigate back
 };
  return (
    <SafeAreaProvider>
    <SafeAreaView>
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
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default index