import { View, Text } from 'react-native'
import React from 'react'
import ConnectionCard from '../components/ConnectionCard'

const notify = () => {
  return (
    <View>
      <ConnectionCard/>
      <ConnectionCard/>
      <ConnectionCard/>
      <ConnectionCard/>
      <ConnectionCard/>
    </View>
  )
}

export default notify