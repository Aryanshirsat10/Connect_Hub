import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { parseISO, isToday, isYesterday, format, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import pb from '../services/connection';

const ConnectionCard = ({connection}) => {
  console.log(JSON.stringify(connection), "Connection Card");
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
  const handlereject=async()=>{
    try {
      const record = await pb.collection('connectionrequests').delete(connection.id);
      console.log("deleted connection request");
    } catch (error) {
      console.log("error deleting connection",error);
    }
  };

  const handleaccept = async() =>{
    try {
      console.log(pb.authStore.model.id);
      const record = await pb.collection('users').getOne(connection.expand.from.id);
      console.log(pb.authStore.model.id);
      const updateData = {
        ...record,
        Connections: [...record["Connections"], pb.authStore.model.id],
      };
      console.log(connection.expand.to.id);
      console.log(JSON.stringify(updateData));
      const updateData1 = {
        ...pb.authStore.model,
        Connections: [...pb.authStore.model["Connections"], connection.expand.from.id],
      };
      console.log(JSON.stringify(updateData1));
      const record1 = await pb.collection('users').update(connection.expand.from.id, updateData);
      const record2 = await pb.collection('users').update(pb.authStore.model.id, updateData1);
      console.log("Updated successfully");
      handlereject();
    // else if(isFollowing){
    //   const updateData = {
    //     ...record,
    //     Followers: record["Followers"].filter(followerId => followerId !== pb.authStore.model.id),
    //   };
    //   console.log(connection.expand.to.id);
    //   console.log(JSON.stringify(updateData));

    //   const updateData1 = {
    //     ...pb.authStore.model,
    //     Following: pb.authStore.model["Following"].filter(followingId => followingId !== user1.id),
    //   };
    //   console.log(JSON.stringify(updateData1));

    //   await pb.collection('users').update(user1.id, updateData);
    //   await pb.collection('users').update(pb.authStore.model.id, updateData1);
    //   console.log("Unfollowed successfully");
    // }
  }catch(error){
    console.log(error)
  }
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
      <Text className="text-lg font-semibold capitalize">{connection.expand.from.name}</Text>
      <Text className="text-sm text-gray-600">{formattedTimestamp}</Text>
    </View>
  </View>
  <View className="flex flex-row gap-4">
    <View>
    <TouchableOpacity className="ml-5" onPress={handlereject}>
    <FontAwesome6 name="circle-xmark" size={36} color="red" />
    </TouchableOpacity>
    </View>
    <View>
    <TouchableOpacity onPress={handleaccept}>
    <FontAwesome6 name="circle-check" size={36} color="green" />
    </TouchableOpacity>
    </View>
  </View>
  
</View>
)
}

export default ConnectionCard