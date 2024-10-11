import React, { useState } from 'react'; // Import useState
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';

const AddReview = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(4); // State for current rating
  const [msg, setMsg] = useState('');
  const userId = "Sakshi";

  function handleMsg(e){
    setMsg(e);
  }

  const onAdd = async () => {
    // Store review details in the db
    try {
      const reviewResponse = await fetch('http://192.168.0.106:5001/reviews', { // Change URL to your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: rating, // Sending rating
          message: msg,   // Sending the review message
          userId,
        }),
      });

      const reviewData = await reviewResponse.json();

      if (reviewResponse.ok) {
        Alert.alert('Review added successfully!', 'Thank you for your feedback!');
        // Optionally navigate to another page after adding the review
        navigation.navigate('Home'); 
      } else {
        Alert.alert('Failed to add review', reviewData.error || 'An error occurred');
      }

    } catch (error) {
      Alert.alert('Network error', 'Could not add review');
    }
  };

  return (
    <View className="bg-black w-full h-full">
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
        <Text className="text-white text-3xl mt-6 font-bold">Rate Your Experience</Text>
      </View>

      <View className="items-center mt-6">
        <Text className="text-white text-5xl font-bold">{rating.toFixed(1)}</Text>
        <View className="flex-row mt-2">
          {/* Display the stars (5 stars, change color based on rating) */}
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
              <StarIcon
                size={24}
                color={index < rating ? '#d3ad7f' : 'gray'} // Change color based on rating
              />
            </TouchableOpacity>
          ))}
        </View>
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
            style={{ height: '100%', textAlignVertical: 'top', color: 'white' }} // Align text to the top
          />
        </View>
        {/* Button */}
        <TouchableOpacity
          className="py-3 bg-darkmainn rounded-xl w-[200px] mb-5 mt-5"
          onPress={onAdd} // Call onAdd function to store review
        >
          <Text className="text-xl font-bold text-center text-white">Add Review</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="w-[30%] h-[30%]">
          <Image 
            source={require('../../assets/images/homeimg/logo.png')} 
            className="w-full h-full object-contain" // Use object-contain to maintain aspect ratio
          />
        </View>
        <Text className="text-main text-3xl font-bold ">Kafe</Text>
      </View>

    </View>
  );
};

export default AddReview;
