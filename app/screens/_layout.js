import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function screensStack() {
    return (
      <Stack>
         <Stack.Screen name="messages" options={{
            title: "Messages",
            headerTitleAlign:"center",
         }}/>
         <Stack.Screen name="directmessage" options={{ headerShown: false }}/>
         <Stack.Screen name="profile" options={{ headerShown: true, headerTitleAlign: "center" }}/>
      </Stack>
    );
   }
   