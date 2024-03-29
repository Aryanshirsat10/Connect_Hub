import React from 'react'
import { View,Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, router } from 'expo-router';
import { format } from 'date-fns';

const MessageCard = ({ content, sender, timestamp,currentuser,id}) => {
    const navigation = useNavigation();
    const formattedTimestamp = format(new Date(timestamp), 'h:mm a');
  return (
    <TouchableOpacity onPress={() => router.push({pathname: '/screens/directmessage', params : {sender: sender?.username , senderprofile: sender?.avatar, senderid: sender?.id, currentuser: currentuser?.id, messageid:id}})}>
    <View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between border-b border-gray-300">
      <View className="flex flex-row">
        <View className="flex items-center">
          <Image
            source={{uri: `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${sender.id}/${sender.avatar}?token=`}}
            style={{ width: 60, height: 60, borderRadius: 20 }}
            className="rounded-full mr-3"
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-col">
          <Text className="text-xl font-semibold">{sender?.username}</Text>
          <Text className="text-sm text-gray-600">{content}</Text>
        </View>
      </View>
      <View className="flex flex-row gap-4">
      <Text className="text-sm font-light">{formattedTimestamp}</Text>
        <View className="flex">
        <Ionicons name="chevron-forward" size={24} color="grey" />
        </View>
        <View>
        </View>
      </View>
      
    </View>
    </TouchableOpacity>
  )
}

export default MessageCard