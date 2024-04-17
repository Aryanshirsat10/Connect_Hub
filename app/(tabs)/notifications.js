import { View, Text, ScrollView,RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import ConnectionCard from '../components/ConnectionCard'
import pb from '../services/connection'
import { SafeAreaView } from 'react-native-safe-area-context'

const notify = () => {
  const [connections, setConnections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Here you can call your fetchPosts and fetchuser functions again
    fetchConnection();
    // to refresh the data. Make sure to set refreshing back to false
    // once the data is fetched.
    setRefreshing(false);
  }, []);
  const fetchConnection =async() =>{
    try {
      const records = await pb.collection('connectionrequests').getFullList({
        sort: '-created',
        expand: 'from,to',
    });
    console.log(JSON.stringify(records));
    const filteredConnections = records.filter(connection => connection.from != pb.authStore.model.id);
    setConnections(filteredConnections);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchConnection();
  }, [])
  
  return (
    <SafeAreaView>
      <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
    <View>
      {connections.map((connection) => (
            <ConnectionCard key={connection._id} connection={connection}/>
            ))}
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default notify