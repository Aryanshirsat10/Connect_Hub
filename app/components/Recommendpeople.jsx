import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import pb from '../services/connection';
const Recommendpeople = ({user1}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const currentUserRecord = await pb.collection('users').getOne(pb.authStore.model.id);
        setIsFollowing(currentUserRecord.Following.includes(user1.id));
      } catch (error) {
        console.log(error);
      }
    };

    checkIfFollowing();
 }, [user1, ]); // This effect runs when the component mounts and whenever `user1` changes.
  const handlefollow = async() =>{
    if(!isFollowing){
      try {
        console.log(pb.authStore.model.id);
        const record = await pb.collection('users').getOne(user1.id);
        const record3 = await pb.collection('users').getOne(pb.authStore.model.id);
        console.log(pb.authStore.model.id);
        const updateData = {
          ...record,
          Followers: [...record["Followers"], pb.authStore.model.id],
        };
        console.log(user1.id);
        console.log(JSON.stringify(updateData));
        const updateData1 = {
          ...record3,
          Following: [...record3["Following"], user1.id],
        };
        console.log(JSON.stringify(updateData1));
        const record1 = await pb.collection('users').update(user1.id, updateData);
        const record2 = await pb.collection('users').update(pb.authStore.model.id, updateData1);
        console.log("Updated successfully")
      } catch (error) {
        console.log(error)
      }
    }
    else if(isFollowing){

    }
  }
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    handlefollow();
 };
  return (
    <View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between">
      <View className="flex flex-row">
        <View className="flex items-center mr-2">
          <Image
             source={{uri: `https://connecthub.pockethost.io/api/files/_pb_users_auth_/${user1.id}/${user1.avatar}?token=`}}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-col">
          <Text className="text-lg font-semibold">{user1.name}</Text>
          <Text className="text-md text-gray-600">Suggested for you</Text>
        </View>
      </View>
      <View className="flex flex-row gap-2">
      <TouchableOpacity className={`border-gray-300 rounded-lg px-2 py-1 mt-2 ${isFollowing? 'bg-gray-400' : 'bg-[#007AFF]'} ${isFollowing ? 'w-24' : 'w-20'} items-center shadow-xl`} onPress={toggleFollow}>
        <Text className="font-semibold text-lg text-white">{isFollowing ? 'Following' : 'Follow'}</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default Recommendpeople