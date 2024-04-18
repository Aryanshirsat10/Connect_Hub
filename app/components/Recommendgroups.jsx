import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import pb from '../services/connection';
const Recommendgroups = ({group}) => {
  console.log(group);
  const [isFollowing, setIsFollowing] = useState(false);
  const currentuser = pb.authStore.model.id;
  useEffect(() => {
    const checkIfFollowing = async () => {
        setIsFollowing(group.groupmembers.includes(currentuser));
    };

    checkIfFollowing();
 }, [currentuser, ]);

 const handlefollow = async() =>{
  try {
    console.log(group.id)
        const record = await pb.collection('groups').getOne(group.id);
        if(!isFollowing){
        const updateData = {
          ...record,
          groupmembers: [...record["groupmembers"], currentuser],
        };
        const record2 = await pb.collection('groups').update(group.id, updateData);
        console.log("Updated successfully")
      }
      else if(isFollowing){
        const updateData = {
          ...record,
          groupmembers: record["groupmembers"].filter(groupmemberId => groupmemberId !== pb.authStore.model.id),
        };
        console.log(JSON.stringify(updateData));
        await pb.collection('groups').update(group.id, updateData);
        console.log("Unfollowed successfully");
      }
  } catch (error) {
    console.log(error);
  }
 };
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    handlefollow();
 };
  return (
    <View className="flex items-center space-x-4 bg-white p-2 flex-row justify-between">
      <View className="flex flex-row">
        <View className="flex items-center mr-2">
          <Image
            source={{uri : `https://connecthub.pockethost.io/api/files/3fltudul115pos9/${group.id}/${group.groupicon}?token=`}}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-col">
          <Text className="text-lg font-semibold">{group.groupname}</Text>
          <Text className="text-md text-gray-600">Suggested for you</Text>
        </View>
      </View>
      <View className="flex flex-row gap-2">
      <TouchableOpacity className={`border-gray-300 rounded-lg px-1 py-1 mt-2  ${isFollowing? 'bg-gray-400' : 'bg-[#007AFF]'} ${isFollowing ? 'w-24' : 'w-20'} items-center`} onPress={toggleFollow}>
        <Text className="font-semibold text-lg text-white">{isFollowing ? 'Following' : 'Follow'}</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default Recommendgroups