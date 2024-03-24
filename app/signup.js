import { Link } from 'expo-router';
import React, {useState} from 'react'
import Pockethost from 'pocketbase';
import { View,Text, SafeAreaView, TextInput, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import pb from './services/connection';
const login =   () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setuserName] = useState('');
  const [confirm,setConfirm]=useState('');
  const [name,setName] = useState('');
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
    const data = {
        "username": userName.toLowerCase().toString(),
        "email": email.toLowerCase().toString(),
        "emailVisibility": true,
        "password": password.toLowerCase().toString(),
        "passwordConfirm": confirm.toLowerCase().toString(),
        "name":name.toLowerCase().toString()
    }
  try {
    console.log(`data:${data.email}`);
    const existinguser = await pb.collection('users').getFirstListItem(`email=${data.email}`);
    console.log(`user:${existinguser}`);
    console.log(`record1:${record1}`);
    if(existinguser){
      Alert.alert("User already exists");
    }else{
      const record = await pb.collection('users').create(data);
      console.log(`record: ${JSON.stringify(record, null, 2)}`);
      if(pb.authStore.isValid.toString()){
      navigation.navigate('(tabs)');
      }
    }
  } catch (error) {
      // Handle other errors
      if (error.data && error.data.code === 400) {
        // Handle the 400 error for existinguser
        const record = await pb.collection('users').create(data);
        console.log(`record: ${JSON.stringify(record, null, 2)}`);
        if(pb.authStore.isValid.toString()){
            navigation.navigate('login');
        }
    } else if (error.data && error.data.email && error.data.email.code === "validation_invalid_email") {
        Alert.alert("The email is invalid or already in use.");
    } else if (error.data && error.data.username && error.data.username.code === "validation_invalid_username") {
        Alert.alert("The username is invalid or already in use.");
    } else {
        // Handle other errors
        console.error('Failed to authenticate:', error.data);
    }
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
            <Text className="text-sm font-bold">Name</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2"
              placeholder="name"
              onChangeText={setName}
              value={name}
            />
        </View>
        <View className="space-y-2">
            <Text className="text-sm font-bold">Username</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2"
              placeholder="username"
              autoCapitalize="none"
              onChangeText={setuserName}
              value={userName}
            />
        </View>
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
          </View>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <View className="space-y-2 flex flex-row justify-between items-center">
            <Text className="text-sm font-bold">Confirm Password</Text>
          </View>
          <TextInput
            className="border border-gray-300 rounded-md p-2"
            placeholder="Password"
            secureTextEntry
            onChangeText={setConfirm}
            value={confirm}
          />
          {/* <Link href="/(tabs)" asChild> */}
          <TouchableOpacity className="w-full bg-blue-500 p-2 rounded-full" onPress={handleLogin}>
            <Text className="text-white text-center">Signup</Text>
          </TouchableOpacity>
          {/* </Link> */}
          <TouchableOpacity className="w-full bg-gray-200 p-2 rounded-full" onPress={handleLoginWithGoogle}>
            <Text className="text-black text-center">Signup with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </SafeAreaView>
  )
}

export default login