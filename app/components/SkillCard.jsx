import { View, Text, Image } from 'react-native'
import React from 'react'

const SkillCard = () => {
  return (
    <View className="flex items-center space-x-4 bg-white p-2 pl-4 flex-row justify-between shadow-xl rounded-lg">
    <View className="flex flex-row justify-between w-full">
        <View className="flex flex-col">
        <Text className="text-lg font-semibold capitalize">Skill Name</Text>
        <Text className="text-sm text-gray-600">Job Title</Text>
        </View>
        <View className="flex flex-row">
            <Text className="flex capitalize">Experience Level</Text>
        </View>
    </View>
    </View>
  )
}

export default SkillCard