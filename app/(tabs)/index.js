import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../CustomHeader'
import { useNavigation } from 'expo-router'

const index = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack(); // Navigate back
 };
  return (
    <View>
      {/* <CustomHeader onBack={handleBack} /> */}
      {/* <View className="bg-white justify-center">
        <Text>ConnectHub</Text>
      </View> */}
      <Text>HI</Text>
    </View>
  )
}

export default index