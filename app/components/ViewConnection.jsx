import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { parseISO, isToday, isYesterday, format, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import pb from '../services/connection';

const ViewConnection = ({connection}) => {
  console.log(connection,"connection from view card")
  const date = parseISO(connection.created); // Parse the timestamp to a Date object
let formattedTimestamp;

// Calculate the difference in minutes, hours, and days between the creation date and the current date
const minutesDifference = differenceInMinutes(new Date(), date);
const hoursDifference = differenceInHours(new Date(), date);
const daysDifference = differenceInDays(new Date(), date);

// Check if the date is today, yesterday, or another date
if (isToday(date)) {
    // If less than an hour ago, display minutes ago
    if (minutesDifference < 60) {
        formattedTimestamp = `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        formattedTimestamp = format(date, 'h:mm a'); // Format as 'h:mm a' if it's today
    }
} else if (isYesterday(date)) {
    formattedTimestamp = 'Yesterday'; // Display 'Yesterday' if it's yesterday
} else {
    formattedTimestamp = format(date, 'dd/MM/yyyy'); // Format as 'dd/MM/yyyy' for other dates
}

// If it's more than a day ago, display days ago
if (daysDifference > 0) {
    formattedTimestamp = `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
}

const handleDisconnect = async()=>{
  try {
    const record = await pb.collection('users').getOne(connection.id);
    const updateData = {
      ...record,
      Connections: record["Connections"].filter(ConnectionId => ConnectionId !== pb.authStore.model.id),
    };
    // console.log(user1.id);
    console.log(JSON.stringify(updateData));

    const updateData1 = {
      ...pb.authStore.model,
      Connections: pb.authStore.model["Connections"].filter(ConnectionId => ConnectionId !== connection.id),
    };
    console.log(JSON.stringify(updateData1));

    await pb.collection('users').update(connection.id, updateData);
    await pb.collection('users').update(pb.authStore.model.id, updateData1);
    console.log("Disconnected successfully");
  } catch (error) {
    console.log(error);
  }
};
  return (<View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between">
  <View className="flex flex-row">
    <View className="flex items-center pr-2 pt-2">
      <Image
        source={{uri: `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${connection.id}/${connection.avatar}?token=`}}
        className="h-10 w-10 rounded-full"
        resizeMode="cover"
      />
    </View>
    <View className="flex flex-col">
      <Text className="text-lg font-semibold">{connection.name}</Text>
      <Text className="text-sm text-gray-600">{formattedTimestamp}</Text>
    </View>
  </View>
  <View className="flex flex-row gap-4">
    <View>
    <TouchableOpacity className="ml-2 mt-2">
    <Entypo name="dots-three-horizontal" size={24} color="black" />
    </TouchableOpacity>
    </View>
    <View>
    <TouchableOpacity style={styles.customButton} onPress={handleDisconnect}>
        <Text className="font-semibold text-lg text-[#007AFF]">Disconnect</Text>
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