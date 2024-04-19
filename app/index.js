import { View,ScrollView, Text,Image,TouchableOpacity, SafeAreaView,Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';
import pb from './services/connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack(); // Navigate back
 };

 
 const fetchStoredLoginDetails = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('loggedInUser');
    if (storedUser !== null) {
      const { email, password } = JSON.parse(storedUser);
      console.log(email,password);
      const authData = await pb.collection('users').authWithPassword(email.toLowerCase().toString(),password.toLowerCase().toString());
    if(pb.authStore.isValid.toString()){
      console.log("login successfull");
      navigation.navigate('(tabs)');
    }
      // Use fetched email and password for further authentication or navigation
    } else {
      navigation.navigate('login');
      // No stored login details found, proceed with normal login
    }
  } catch (error) {
    console.error('Error fetching stored login details:', error);
  }
};

useEffect(() => {
  // Fetch stored login details when the app starts
  fetchStoredLoginDetails();
}, []);
  return (
    <RootSiblingParent>
        <SafeAreaProvider>
        <SafeAreaView>
            <View className="flex justify-center items-center w-full h-full flex-col">
              <Image
              className="w-40 h-40 rounded-full"
              source={require('../assets/images/logo8.png')}
              resizeMode="cover"
              />
                <Text className="text-4xl font-bold text-purple-400">ConnectHub</Text>
                <Link href="/login" asChild>
                <Pressable>
                  <Text className="text-2xl font-semibold text-purple-400">Login</Text>
                </Pressable>
                </Link>
                <Link href="/(tabs)" asChild>
                <Pressable>
                  <Text>Home</Text>
                </Pressable>
                </Link>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
    </RootSiblingParent>
  )
}

export default App