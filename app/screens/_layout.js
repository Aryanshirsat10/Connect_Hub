import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function screensStack() {
    return (
      <Stack>
         <Stack.Screen name="(toptabs)" options={{
            title: "Messages",
            headerTitleAlign:"center",
         }}/>
         <Stack.Screen name="directmessage" options={{ headerShown: false }}/>
         <Stack.Screen name="groupmessage" options={{ headerShown: false }}/>
         <Stack.Screen name="profile" options={{ headerShown: false, headerTitleAlign: "center" }}/>
         <Stack.Screen name="groupdetail" options={{ headerShown: false, headerTitleAlign: "center" }}/>
         <Stack.Screen name="initialprofile" options={{headerShown: false}}/>
         <Stack.Screen name="userprofile" options={{headerShown: false}}/>
         <Stack.Screen name="jobdetails" options={{headerShown: false, headerTitleAlign: "center"}}/>
      </Stack>
    );
   }
   