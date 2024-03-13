import { Link } from 'expo-router';
import React from 'react'
import { View,Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
const login = () => {
  return (
    <SafeAreaView>
      <View className="flex justify-center items-center w-full h-full bg-slate-100">
      <View className="flex rounded-lg shadow-xl p-4 bg-white">
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
          />
          <Link href="/(tabs)" asChild>
          <TouchableOpacity className="w-full bg-blue-500 p-2 rounded-md">
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>
          </Link>
          <TouchableOpacity className="w-full bg-gray-200 p-2 rounded-md">
            <Text className="text-black text-center">Login with Google</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4 text-center text-sm">
          <Text>Don't have an account?</Text>
          <TouchableOpacity>
            <Text className="underline">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </SafeAreaView>
  )
}

export default login