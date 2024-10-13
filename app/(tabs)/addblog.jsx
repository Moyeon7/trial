import React, { useState } from 'react'; // Import useState
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const AddBlog = () => {
  const navigation = useNavigation();
  const [msg, setMsg] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const userId = "Pichu";

  function handleMsg(e){
    setMsg(e);
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Save the image URI
    }
  };

  const onAdd = async () => {
    try {
      // Proceed to add review if no previous review was found
      const blogResponse = await fetch('http://192.168.0.106:5001/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: msg, // Sending the review message
          userId,    // Sending userId
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
            onChangeText={handleMsg}  // Fixed event handler for TextInput
            placeholder='Start typing...'
            multiline={true}  // Enable multiline input
            numberOfLines={5}
            style={{ height: '100%', textAlignVertical: 'top', color: 'white' }} // Align text to the top
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
            className="w-full h-full object-contain" // Use object-contain to maintain aspect ratio
          />
        </View>
        <Text className="text-main text-3xl font-bold">Kafe</Text>
      </View>
    </View>
  );
};

export default AddBlog;
