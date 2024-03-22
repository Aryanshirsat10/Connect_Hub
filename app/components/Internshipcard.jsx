import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const Internshipcard = () => {
  const [isSaved, setIsSaved] = useState(false);
  const toggleSave = () => {
    setIsSaved(!isSaved);
  }
  return (
    <View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between">
      <View className="flex flex-row">
        <View className="flex items-center">
          <Image
            source={require('../../assets/images/demopost.jpg')}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-col">
          <Text className="text-lg font-semibold">Software Developer</Text>
          <Text className="text-sm text-gray-600">Mumbai, Maharashtra, India</Text>
        </View>
      </View>
      <View className="flex flex-row gap-4">
        <View>
        <TouchableOpacity className="ml-5" onPress={toggleSave}>
        {isSaved ? <FontAwesome name="bookmark" size={32} color="black"/> : <FontAwesome name="bookmark-o" size={32} color="black"/>}
        </TouchableOpacity>
        </View>
        <View>
        <Entypo name="dots-three-vertical" size={24} color="black" />
        </View>
      </View>
      
    </View>
  )
}

export default Internshipcard