import { View, Text, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/CustomHeader'
import { useLocalSearchParams } from 'expo-router'
import pb from '../services/connection'
import Internshipcard from '../components/Internshipcard'
import { Ionicons } from '@expo/vector-icons'

const jobdetails = () => {
    const {title} = useLocalSearchParams();
    const [alumniJobs, setAlumniJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState("");
    const [location, setLocation] = useState('');
    const [jobtitle, setJobtitle] = useState('');
    const fetchjobs = async() =>{
        console.log("user type from jobs:", pb.authStore.model.Type);
        try {
          const records = await pb.collection('internships').getFullList({
            sort: '-created',
        });
        const filterlist = records.filter(job => {
            console.log("Authenticated Alumni ID:", pb.authStore.model.id);
            console.log("Job Object:", job.postedby);
            return job.postedby === pb.authStore.model.id;
          });
        
          const filterlist1 = records.filter(job => {
            console.log("Authenticated Alumni ID:", pb.authStore.model.id);
            console.log("Job Object:", job.savedby);
            return job.savedby == pb.authStore.model.id;
          });
          console.log(filterlist1);
        setAlumniJobs(filterlist);
        setSavedJobs(filterlist1);
        } catch (error) {
          console.log(error);
        }
      };
      const toggleModel = () => {
        setIsModelOpen(!isModelOpen);
      };
      const postjob = async() =>{
        var dateString = startDate;

        // Split the date string into day, month, and year
        var parts = dateString.split('-');
        var date = new Date(parts[2], parts[1] - 1, parts[0]);
        console.log(date);
        try {
          const data = {
            "start_date": date,
            "duration": parseInt(duration),
            "location": location,
            "title": jobtitle,
            "postedby": pb.authStore.model.id,
        };
        
        const record = await pb.collection('internships').create(data);
        console.log(record);
        alert("Post Successful!");
        toggleModel();
        } catch (error) {
          console.log("Error posting data");
        }
      };
      useEffect(() => {
        fetchjobs();
      }, [])
    // console.log(title);
    if(title == "Saved Jobs"){
        return (
          <SafeAreaView className="bg-gray-50">
          <CustomHeader title={title} />
          <View className="mt-1 p-2">
            <Text className="text-xl font-bold">Saved jobs</Text>
            <View className="mt-2 space-y-2" />
            {savedJobs.map((job) => (
                  <Internshipcard key={job.id} job={job} />
                ))}
            </View>
          </SafeAreaView>
        );
    }
    else if(title=="Applied Jobs"){
    return (
        <SafeAreaView>
            <CustomHeader title={title} />
        <View>
            <Text>Applied Jobs</Text>
        </View>
        </SafeAreaView>
    );
    }
    else if( title == "Posted Jobs"){
    return (
        <SafeAreaView className="bg-gray-50 relative flex-1">
            <CustomHeader title={title} />
        <View className="mt-1 p-2">
          <Text className="text-xl font-bold">Posted jobs</Text>
          <View className="mt-2 space-y-2" />
          {alumniJobs.map((job) => (
                <Internshipcard key={job.id} job={job} />
              ))}
          </View>
        <TouchableOpacity className="bg-[#c084fc] rounded-full absolute bottom-8 right-5 p-3 shadow-lg shadow-slate-600" onPress={toggleModel}>
            <Ionicons  name='add' size={36} color="white" />
            {/* 4C9F7D */}
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModelOpen}
        onRequestClose={toggleModel}
        >
          <View className="flex-1 justify-center items-center">
            <View className="w-4/5 bg-white rounded-lg p-4">
              <Text className="text-xl font-bold text-center mb-4">Post a new job:</Text>
              <Text className="font-medium text-md">Title</Text>
              <TextInput
              placeholder="Title"
              onChangeText={(text) => setJobtitle(text)}
              value={jobtitle}
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 10 }}
              />
              <Text className="font-medium text-md">StartDate</Text>
              <TextInput
              placeholder="dd-mm-yyyy"
              onChangeText={(text) => setStartDate(text)}
              value={startDate}
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 10 }}
            />
            <Text className="font-medium text-md">Duration</Text>
            <TextInput
              placeholder="Duration"
              onChangeText={(text) => setDuration(text)}
              value={duration}
              keyboardType="numeric"
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 10 }}
            />
            <Text className="font-medium text-md">Location</Text>
            <TextInput
              placeholder="Location"
              onChangeText={(text) => setLocation(text)}
              value={location}
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 10 }}
            />
              <View className="flex w-full flex-row gap-x-2">
              <TouchableOpacity onPress={toggleModel} className="self-center mt-4 bg-gray-200 p-2 w-[50%] rounded-lg items-center">
                <Text className="font-semibold text-purple-600 text-lg">Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={postjob} className="self-center mt-4 bg-gray-200 p-2 w-[50%] rounded-lg items-center">
              <Text className="font-semibold text-purple-600 text-lg">Post</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        </SafeAreaView>
        );
    }
}

export default jobdetails