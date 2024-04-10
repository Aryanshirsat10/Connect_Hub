import { View,ScrollView, Text,Image,TouchableOpacity, SafeAreaView,RefreshControl  } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from 'expo-router';
import Post from  '../components/posts';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import pb from '../services/connection';

const index = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [refreshing, setRefreshing] = useState(false);
  const handleBack = () => {
    navigation.goBack(); // Navigate back
 };

 const fetchPosts = async () => {
  try {
    console.log('Fetching posts...');
    console.log('user from pb model:',pb.authStore.model);
    const followedUserIds = pb.authStore.model?.Following;
    console.log('Followed user IDs:', followedUserIds);

    const records = await pb.collection('posts').getFullList({
      sort: '-created',
      expand: 'userid'
    });
    // console.log(`record from index file:${JSON.stringify(records,null,2)}`);
    const filteredPosts = records.filter(post => post.userid === pb.authStore.model.id || followedUserIds.includes(post.userid));
    console.log('Filtered posts:', filteredPosts);
    setPosts(filteredPosts); // Update the posts state with fetched records
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
};

const fetchuser = async()=>{
  try {
    for (const post of posts) {
      const user = await pb.collection('users').getFirstListItem(post.userid);
      console.log(`user data:${JSON.stringify(user, null, 2)}`);
      // Handle the user data as needed
    }
  } catch (error) {
    console.log(`failed to fetch user ${error}`);
  }
};
 useEffect(() => {
  fetchPosts(); // Call the function to fetch posts
  fetchuser();
  //live update for  profile info
    // const userId = pb.authStore.model.id;
    // pb.collection('users').subscribe(userId, function (e) {
    //   console.log(e.action);
    //   console.log(e.record);
    //   setUser1(e.record); // Update the user's profile data
    // }, { /* other options like expand, custom headers, etc. */ });

    // return () => {
    //   pb.collection('users').unsubscribe(userId); // Remove the subscription
    // };
}, []); // Empty dependency array means this effect runs once on mount

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  // Here you can call your fetchPosts and fetchuser functions again
  fetchPosts(); // Call the function to fetch posts
  fetchuser();
  // to refresh the data. Make sure to set refreshing back to false
  // once the data is fetched.
  setRefreshing(false);
}, []);

useEffect(() => {
  // Function to request permissions and register for push notifications
  const setupNotifications = async () => {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('No notification permissions!');
      return;
    }

    // // Register for push notifications
    // const token = await Notifications.getExpoPushTokenAsync();
    // console.log(token.data);
    // Save the token to your backend or use it to subscribe to a topic
  };

  // Call the setup function
  setupNotifications();
}, []);

  return (
    <SafeAreaProvider>
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View className="space-y-4 p-1">
          {/* Repeat the following block for each post */}
          {posts.map((post, index) => (
              <Post key={index} postData={post} />
            ))}
          {/* End of post block */}
        </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default index