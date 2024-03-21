import { Link } from 'expo-router';
import React, {useState} from 'react'
import Svg, { Path } from 'react-native-svg';
// import Toast from 'react-native-root-toast';
import { View,Text, SafeAreaView, TextInput, TouchableOpacity,ToastAndroid, Platform, AlertIOS } from 'react-native';
import { useNavigation } from 'expo-router';
import pb from './services/connection';
function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
}
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
      console.error('Failed to authenticate with Google:', error.data);
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
      notifyMessage('Login successful');
      console.log("login successfull");
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
          <TouchableOpacity className="w-full bg-blue-500 p-2 rounded-full" onPress={handleLogin}>
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>
          {/* </Link> */}
          <TouchableOpacity className="w-full bg-gray-200 p-2 rounded-full flex flex-row justify-center" onPress={handleLoginWithGoogle}>
          <Svg width="20" height="20" viewBox="0 0 512 512">
              <Path
                fill="#FBBB00"
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                C103.821,274.792,107.225,292.797,113.47,309.408z"
              />
              <Path
                fill="#518EF8"
                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
              />
              <Path
                fill="#28B446"
                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
              />
              <Path
                fill="#F14336"
                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
                C318.115,0,375.068,22.126,419.404,58.936z"
              />
          </Svg>
            <Text className="text-black text-center ml-3">
              Login with Google
              </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4 text-center text-sm flex flex-row">
          <Text>Don't have an account?</Text>
          <Link href="/signup" asChild>
          <TouchableOpacity>
            <Text className="underline text-blue-500 ml-2">Sign up</Text>
          </TouchableOpacity>
          </Link>
        </View>
      </View>
      </View>
    </SafeAreaView>
  )
}

export default login