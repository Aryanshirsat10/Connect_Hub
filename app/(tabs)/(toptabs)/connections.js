import { View, Text, ScrollView,RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import pb from '../../services/connection'
import { SafeAreaView } from 'react-native-safe-area-context'
import ViewConnection from '../../components/ViewConnection'

const notify = () => {
  const [network, setNetwork] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Here you can call your fetchPosts and fetchuser functions again
    fetchConnection();
    // to refresh the data. Make sure to set refreshing back to false
    // once the data is fetched.
    setRefreshing(false);
  }, []);
  const fetchConnection = async() =>{
    try {
        const record = await pb.collection('users').getOne(pb.authStore.model.id, {
            expand: 'Connections',
        });
        console.log('network: ',record);
        setNetwork(record.expand.Connections);
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
        {network.map((connection) => (
            <ViewConnection key={connection.id} connection={connection}/>
        ))} 
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default notify