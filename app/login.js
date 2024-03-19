import { Link } from 'expo-router';
import React, {useState} from 'react'
import Pockethost from 'pocketbase';
import { View,Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import pb from './services/connection';
const login =   () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 
  const handleLoginWithGoogle = async () => {
    try {
      // console.log(pb);
      const authMethods = await pb.collection('users').listAuthMethods();
      console.log(authMethods);
      const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
      // console.log(authData);
      // console.log(pb.authStore.isValid);
      // console.log(pb.authStore.token);
      // console.log(pb.authStore.model.id);
      // Handle successful authentication here
      // For example, navigate to the next screen
      navigation.navigate('(tabs)');
    } catch (error) {
      console.error('Failed to authenticate with Google:', error);
      // Handle error here
    }
 };
 async function handleLogin ()  {
  try {
    // console.log(email);
    // console.log(password);
    const authData = await pb.collection('users').authWithPassword(email.toLowerCase().toString(),password.toLowerCase().toString());
    // console.log(pb.authStore.isValid);
    // console.log(pb.authStore.token);
    // console.log(pb.authStore.model.id);
    if(pb.authStore.isValid.toString()){
      navigation.navigate('(tabs)');
    }
  } catch (error) {
      // Handle other errors
      console.error('Failed to authenticate:', error);
  }
 };
  return (
    <SafeAreaView>
      <View className="flex justify-center items-center w-full h-full bg-slate-100">
      <View className="flex rounded-lg shadow-xl p-4 bg-white">
      <Text>Login status{pb.authStore.isValid.toString()}</Text>
        <View className="flex flex-col justify-center w-full gap-2">
          <Text className="text-2xl font-bold">Login</Text>
          <Text className="text-sm">Enter your email below to login to your account</Text>
        </View>
        <View className="space-y-4 mt-3">
          <View className="space-y-2">
            <Text className="text-sm font-bold">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2"
              placeholder="m@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View className="space-y-2 flex flex-row justify-between items-center">
            <Text className="text-sm font-bold">Password</Text>
            <TouchableOpacity>
              <Text className="text-sm underline">Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          {/* <Link href="/(tabs)" asChild> */}
          <TouchableOpacity className="w-full bg-blue-500 p-2 rounded-md" onPress={handleLogin}>
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>
          {/* </Link> */}
          <TouchableOpacity className="w-full bg-gray-200 p-2 rounded-md" onPress={handleLoginWithGoogle}>
            <Text className="text-black text-center">Login with Google</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4 text-center text-sm">
          <Text>Don't have an account?</Text>
          <Link href="/signup" asChild>
          <TouchableOpacity>
            <Text className="underline">Sign up</Text>
          </TouchableOpacity>
          </Link>
        </View>
      </View>
      </View>
    </SafeAreaView>
  )
}

export default login