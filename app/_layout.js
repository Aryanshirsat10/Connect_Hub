import { Stack } from 'expo-router/stack';

export default function AppLayout() {
 return (
   <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="screens" options={{ headerShown: false }}/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="login" options={{
            title: "Login",
            headerTitleAlign:"center",
         }}/>
      <Stack.Screen name="signup" options={{
            title: "Signup",
            headerTitleAlign:"center",
         }}/>
   </Stack>
 );
}


