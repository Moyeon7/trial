import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Ensure axios is imported
import { getUserEmail } from '../(auth)/sign-in';

const AddBlog = () => {
  const navigation = useNavigation();
  const [msg, setMsg] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const API_URL = "http://192.168.0.106:5001";
  const emaill = getUserEmail();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (emaill) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`${API_URL}/user-details`, {
            params: { email: emaill }
          });

          if (response.data && response.data.data) {
            const { username, profileImage } = response.data.data;
            setUsername(username); // Assuming username is your userId
            setImage(profileImage ? { uri: profileImage } : null);
          } else {
            Alert.alert("Error", "User details not found.");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          Alert.alert("Error", "Failed to fetch user details.");
        }
      };
      fetchUserDetails();
    }
  }, [emaill]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const onAdd = async () => {
    try {
      const blogResponse = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: msg,
          userId: username, // Use username as userId
          postImage: selectedImage,
        }),
      });

      const blogData = await blogResponse.json();

      if (blogResponse.ok) {
        Alert.alert('Post Uploaded successfully!');
        navigation.navigate('Home'); 
      } else {
        Alert.alert('Failed to upload post', blogData.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Network error', 'Could not upload post');
    }
  };

  return (
    <View className="bg-blackk w-full h-full">
      {/* Top Section with Arrow and Rating */}
      <View className="flex-row justify-start mt-4 ml-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl"
        >
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex items-center justify-center">
        <Text className="text-white text-3xl mt-6 font-bold underline">Post</Text>
      </View>

      <View className="flex items-start justify-start pl-[55px]">
        <Text className="text-white text-sm py-6 font-bold">Add a comment</Text>
      </View>

      <View className="flex items-center justify-center">
        <View className="bg-zinc-800 w-[300px] h-[140px] rounded-3xl">
          <TextInput
            className="p-3 flex-1 text-gray-700 rounded-2xl text-left h-full"
            value={msg}
            onChangeText={setMsg} // Use setMsg directly
            placeholder='Start typing...'
            multiline={true}
            numberOfLines={5}
            style={{ height: '100%', textAlignVertical: 'top', color: 'white' }}
          />
        </View>

        {/* Image Picker */}
        <TouchableOpacity className="pt-6" onPress={pickImage}>
          <View className="bg-lightmainn p-4 rounded-full">
            <Text className="text-white">Pick an Image</Text>
          </View>
        </TouchableOpacity>

        {selectedImage && (
          <View className="mt-6">
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 100, height: 100 }}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Button */}
        <TouchableOpacity
          className="py-3 bg-darkmainn rounded-xl w-[200px] mb-5 mt-5"
          onPress={onAdd} // Call onAdd function to store review
        >
          <Text className="text-xl font-bold text-center text-white">Upload Post</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="w-[30%] h-[30%]">
          <Image 
            source={require('../../assets/images/homeimg/logo.png')} 
            className="w-full h-full object-contain"
          />
        </View>
        <Text className="text-main text-3xl font-bold">Kafe</Text>
      </View>
    </View>
  );
};

export default AddBlog;
