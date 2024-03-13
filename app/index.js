import { View,ScrollView, Text,Image,TouchableOpacity, SafeAreaView,Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack(); // Navigate back
 };
  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <View className="flex justify-center items-center w-full h-full flex-col">
                <Text className="text-4xl font-bold text-purple-400">ConnectHUb</Text>
                <Link href="/screens/login" asChild>
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
  )
}

export default App