import React, { useEffect } from 'react'
import { View,Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, router } from 'expo-router';


const MemberCard = ({groupmember}) => {
const navigation = useNavigation();

  return (
    <View className="flex w-full items-center space-x-4 p-2 flex-row justify-between border-b border-gray-300">
      <View className="flex flex-row">
        <View className="flex items-center">
          <Image
            source={{uri: `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${groupmember.id}/${groupmember.avatar}?token=`}}
            style={{ width: 60, height: 60, borderRadius: 20 }}
            className="rounded-full mr-3"
            resizeMode="cover"
          />
        </View>
        <View className="flex">
          <Text className="text-xl font-semibold">{groupmember?.username}</Text>
        </View>
      </View>
      <View className="flex flex-row gap-4">
      {/* <Text className="text-sm font-light">{formattedTimestamp}</Text> */}
        {/* <View className="flex">
        <Ionicons name="chevron-forward" size={24} color="grey" />
        </View> */}
        <View>
        </View>
      </View>
      
    </View>
  )
}

export default MemberCard