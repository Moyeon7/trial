<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { ArrowLeftIcon, StarIcon, TrashIcon } from 'react-native-heroicons/solid'; // Import TrashIcon
import { useRouter } from 'expo-router';
import axios from 'axios';
import dayjs from 'dayjs';

const Review = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const getReviews = async () => {
    try {
      const response = await axios.get('http://192.168.0.106:5001/reviews');
      if (response.status === 200) {
        setReviews(response.data.reviews);
        calculateAverageRating(response.data.reviews);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error fetching reviews:', 'Network error. Please try again later.');
    }
  };

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = reviews.length ? totalRating / reviews.length : 0;
    setAverageRating(average);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`http://192.168.0.106:5001/reviews/${reviewId}`);
      if (response.status === 200) {
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
        Alert.alert('Success', 'Review deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      Alert.alert('Error', 'Could not delete the review. Please try again.');
    }
  };

  const renderStars = (rating, size = 20) => {
    return (
      <>
        {[...Array(Math.floor(rating))].map((_, index) => (
          <StarIcon key={index} size={size} color="#d3ad7f" />
        ))}
        {rating % 1 !== 0 && <StarIcon size={size} color="gray" />}
      </>
    );
  };

  return (
    <View className="bg-black w-full h-full">
      <View className="flex-row justify-start mt-4 ml-4">
        <TouchableOpacity onPress={() => router.back()} className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl">
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center mt-6">
        <Text className="text-white text-5xl font-bold">{averageRating.toFixed(1)}</Text>
        <View className="flex-row mt-2">
          {renderStars(averageRating, 24)}
        </View>
      </View>

      <View className="ml-6 mt-6">
        <Text className="text-white text-xl font-bold underline">Reviews</Text>
      </View>

      <ScrollView className="mt-4">
        {reviews.map((review) => (
          <View key={review._id} className="flex-row items-center mx-6 mt-4">
            <Image
              source={{ uri: review.userImage || 'https://via.placeholder.com/50' }}
              className="h-12 w-12 rounded-full"
            />
            <View className="ml-4 flex-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-darkmainn font-extrabold">{review.userId}</Text>
                <Text className="text-gray-400 text-xs">
                  {dayjs(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-white flex-1">{review.message}</Text>
                <View className="ml-2 flex-row">
                  {renderStars(review.rating, 20)}
                </View>
                {/* Button to delete review */}
                <TouchableOpacity
                  onPress={() => deleteReview(review._id)}
                  className="ml-2"
                >
                  <TrashIcon size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Review;
=======
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { ArrowLeftIcon, StarIcon, TrashIcon } from 'react-native-heroicons/solid'; // Import TrashIcon
import { useRouter } from 'expo-router';
import axios from 'axios';
import dayjs from 'dayjs';

const Review = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const getReviews = async () => {
    try {
      const response = await axios.get('http://192.168.0.106:5001/reviews');
      if (response.status === 200) {
        setReviews(response.data.reviews);
        calculateAverageRating(response.data.reviews);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error fetching reviews:', 'Network error. Please try again later.');
    }
  };

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = reviews.length ? totalRating / reviews.length : 0;
    setAverageRating(average);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`http://192.168.0.106:5001/reviews/${reviewId}`);
      if (response.status === 200) {
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
        Alert.alert('Success', 'Review deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      Alert.alert('Error', 'Could not delete the review. Please try again.');
    }
  };

  const renderStars = (rating, size = 20) => {
    return (
      <>
        {[...Array(Math.floor(rating))].map((_, index) => (
          <StarIcon key={index} size={size} color="#d3ad7f" />
        ))}
        {rating % 1 !== 0 && <StarIcon size={size} color="gray" />}
      </>
    );
  };

  return (
    <View className="bg-black w-full h-full">
      <View className="flex-row justify-start mt-4 ml-4">
        <TouchableOpacity onPress={() => router.back()} className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl">
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center mt-6">
        <Text className="text-white text-5xl font-bold">{averageRating.toFixed(1)}</Text>
        <View className="flex-row mt-2">
          {renderStars(averageRating, 24)}
        </View>
      </View>

      <View className="ml-6 mt-6">
        <Text className="text-white text-xl font-bold underline">Reviews</Text>
      </View>

      <ScrollView className="mt-4">
        {reviews.map((review) => (
          <View key={review._id} className="flex-row items-center mx-6 mt-4">
            <Image
              source={{ uri: review.userImage || 'https://via.placeholder.com/50' }}
              className="h-12 w-12 rounded-full"
            />
            <View className="ml-4 flex-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-darkmainn font-extrabold">{review.userId}</Text>
                <Text className="text-gray-400 text-xs">
                  {dayjs(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-white flex-1">{review.message}</Text>
                <View className="ml-2 flex-row">
                  {renderStars(review.rating, 20)}
                </View>
                {/* Button to delete review */}
                <TouchableOpacity
                  onPress={() => deleteReview(review._id)}
                  className="ml-2"
                >
                  <TrashIcon size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Review;
>>>>>>> 1b425caee791463b3c48f72f255386d0a0db0adc
