import React from 'react'
import { View,Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, router } from 'expo-router';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

const GroupCard = ({ content, sender, timestamp,currentuser,id}) => {
    const navigation = useNavigation();
    const date = parseISO(timestamp); // Parse the timestamp to a Date object
    let formattedTimestamp;

    // Check if the date is today, yesterday, or another date
    if (isToday(date)) {
        formattedTimestamp = format(date, 'h:mm a'); // Format as 'h:mm a' if it's today
    } else if (isYesterday(date)) {
        formattedTimestamp = 'Yesterday'; // Display 'Yesterday' if it's yesterday
    } else {
        formattedTimestamp = format(date, 'dd/MM/yyyy'); // Format as 'dd/MM/yyyy' for other dates
    }
  return (
    <TouchableOpacity onPress={() => router.push({pathname: '/screens/groupmessage', params : {sender: sender?.groupname , senderprofile: sender?.groupicon, senderid: sender?.id, currentuser: currentuser?.id, messageid:id}})}>
    <View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between border-b border-gray-300">
      <View className="flex flex-row">
        <View className="flex items-center">
          <Image
            source={{uri: `https://connecthub.pockethost.io/api/files/3fltudul115pos9/${sender.id}/${sender.groupicon}?token=`}}
            style={{ width: 60, height: 60, borderRadius: 20 }}
            className="rounded-full mr-3"
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-col">
          <Text className="text-xl font-semibold">{sender.groupname}</Text>
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

export default GroupCard