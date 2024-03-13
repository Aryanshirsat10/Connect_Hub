import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomHeader = ({ onBack }) => {
 return (
    <View className="flex flex-col justify-between items-center p-2 bg-gray-100 border-b border-gray-200">
      <Button title="Back" onPress={onBack} className="flex"/>
      <Text className="text-lg font-bold flex">ConnectHUb</Text>
      {/* <Image
        source={require('./path-to-your-message-icon.png')} // Update this path to your message icon
        className="w-6 h-6" // Adjust size as needed
      /> */}
    </View>
 );
};

export default CustomHeader;