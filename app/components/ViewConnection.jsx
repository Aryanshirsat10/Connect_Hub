import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

const ViewConnection = () => {
  return (<View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between">
  <View className="flex flex-row">
    <View className="flex items-center">
      <Image
        source={require('../../assets/images/demopost.jpg')}
        style={{ width: 40, height: 40, borderRadius: 20 }}
        resizeMode="cover"
      />
    </View>
    <View className="flex flex-col">
      <Text className="text-lg font-semibold">Riya Hemani</Text>
      <Text className="text-sm text-gray-600">Connected Today</Text>
    </View>
  </View>
  <View className="flex flex-row gap-4">
    <View>
    <TouchableOpacity className="ml-2 mt-2">
    <Entypo name="dots-three-horizontal" size={24} color="black" />
    </TouchableOpacity>
    </View>
    <View>
    <TouchableOpacity style={styles.customButton} >
        <Text className="font-semibold text-lg text-[#007AFF]">Message</Text>
    </TouchableOpacity>
    </View>
  </View>
</View>
)
}
const styles = StyleSheet.create({
    customButton: {
      borderWidth: 1,
      borderColor: '#007AFF',
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 3,
      alignItems: 'center',
    },
    buttonText: {
      color: '#007AFF', // Text color matching the border color
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default ViewConnection