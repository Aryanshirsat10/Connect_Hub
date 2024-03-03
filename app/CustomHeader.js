import React from 'react';
import { View, Text, Button } from 'react-native';

const CustomHeader = ({ onBack }) => {
 return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
      <Button title="Back" onPress={onBack} />
      <Text style={{ fontSize: 20 }}>Title</Text>
      <View /> {/* Placeholder for any other header elements */}
    </View>
 );
};

export default CustomHeader;