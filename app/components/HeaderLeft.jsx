import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';

const HeaderLeft = ({ userProfileImage }) => {
  const navigation = useNavigation();
 const [dropdownVisible, setDropdownVisible] = useState(false);

 const toggleDropdown = () => {
    navigation.navigate('/screens/profile')
 };

 return (
    <View className="pl-5">
      <TouchableOpacity onPress={toggleDropdown}>
        {/* <Image
          className="w-10 h-10 rounded-full bg-slate-600"
          source={{ uri: userProfileImage }} // Assuming userProfileImage is a URL to the user's profile image
          resizeMode="cover"
        /> */}
        <View className='w-10 h-10 rounded-full bg-slate-500'> 
        </View>
      </TouchableOpacity>
    </View>
 );
};

export default HeaderLeft;
