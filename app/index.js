import { View,ScrollView, Text,Image,TouchableOpacity, SafeAreaView,Pressable } from 'react-native';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack(); // Navigate back
 };
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