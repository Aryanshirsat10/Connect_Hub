import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import pb from '../services/connection';
const Internshipcard = ({job}) => {
  const currentUserId = pb.authStore.model.id;
  const savedBy = job.savedby || [];
  const [isSaved, setIsSaved] = useState(false);
  const toggleSave = async() => {
    const hasSaved = job.savedby.includes(currentUserId);
    setIsSaved(!isSaved);
    let newSavedBy = hasSaved ? job.savedby.filter(id => id !== currentUserId) : [...job.savedby, currentUserId];
    try {
      const data = {
        savedby: newSavedBy, // Update only the saves field
      };
      const response = await pb.collection('internships').update(job?.id, data);
      console.log(response);
      console.log('saves updated successfully');
   } catch (error) {
      console.error('Failed to update saves:', error);
   }
  }
  useEffect(() => {
    setIsSaved(savedBy.includes(currentUserId));
 }, [currentUserId, savedBy]); 
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
          <Text className="text-lg font-semibold">{job.title}</Text>
          <Text className="text-sm text-gray-600">{job.location}</Text>
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