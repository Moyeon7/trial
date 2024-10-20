import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Alert, ScrollView } from 'react-native';
import { ArrowLeftIcon, HeartIcon, ChatBubbleLeftRightIcon, ShareIcon, PlusIcon, PencilSquareIcon } from 'react-native-heroicons/solid';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import axios from 'axios';
import dayjs from 'dayjs';
import { getUserEmail } from '../(auth)/sign-in';

const BlogPost = ({ post = {} }) => {
  const navigation = useNavigation();
  const [newComment, setNewComment] = useState('');
  const [isCommentOpen, setIsCommentOpen] = useState(false); 
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
 
  const API_URL = "http://192.168.0.106:5001";
  const emaill = getUserEmail();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  
  // Fetch blogs when the component mounts
  useEffect(() => {
    if (emaill) fetchUserDetails();
  }, [emaill]);

  useEffect(() => {
    if (username) {
      getBlogs();
    }
  }, [username]);

  const getBlogs = async () => {
    try {
      const response = await axios.get('http://192.168.0.106:5001/blogs');
      if (response.status === 200) {
        // Check like status for each blog after fetching
        const updatedBlogs = await Promise.all(response.data.blogs.map(async (blog) => {
          const isLiked = await checkLike(blog._id); // Check if user has liked the blog
          return { ...blog, lc: isLiked }; // Add like status to blog
        }));
        setBlogs(updatedBlogs);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error fetching blogs:', 'Network error. Please try again later.');
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/user-details`, { params: { email: emaill } });
      if (response.data && response.data.data) {
        const { username, profileImage } = response.data.data;
        setUsername(username);
        setImage(profileImage ? { uri: profileImage } : null);
      } else {
        Alert.alert("Error", "User details not found.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      Alert.alert("Error", "Failed to fetch user details.");
    }
  }; 
  
  const checkLike = async (blogId) => {
    if (!username) return false;
    try {
      const response = await axios.post(`http://192.168.0.106:5001/${blogId}/check-like`, { userId: username });
      return response.data.lc; // Assuming response contains a like status
    } catch (error) {
      console.error('Error checking like status:', error);
      return false; // Default to not liked on error
    }
  };

  const toggleLike = async (blogId) => {
    try {
      const currentBlog = blogs.find(blog => blog._id === blogId);
      const isLiked = currentBlog.lc; // Current like status

      if (isLiked) {
        await removeLike(blogId);
      } else {
        await addLike(blogId);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to toggle like status. Please try again later.');
    }
  };

  const addLike = async (blogId) => {
    try {
      const response = await axios.post(`http://192.168.0.106:5001/${blogId}/like`, {userId: username});
      if (response.status === 200) {
        setBlogs(blogs.map(blog =>
          blog._id === blogId ? { ...blog, lc: true, like: response.data.like } : blog
        ));
      }
    } catch (error) {
      console.error('Error adding like:', error);
      Alert.alert('Error', 'Unable to add like. Please try again later.');
    }
  };

  const removeLike = async (blogId) => {
    try {
      const response = await axios.post(`http://192.168.0.106:5001/${blogId}/remove-like`, {userId: username});
      if (response.status === 200) {
        setBlogs(blogs.map(blog =>
          blog._id === blogId ? { ...blog, lc: false, like: response.data.like } : blog
        ));
      }
    } catch (error) {
      console.error('Error removing like:', error);
      Alert.alert('Error', 'Unable to remove like. Please try again later.');
    }
  };

  const handleAddComment = (blogId) => {
    if (newComment.trim()) {
      console.log(`Adding comment to blog ${blogId}: ${newComment}`);
      setNewComment('');
    }
  };

  const renderBlogItem = ({ item }) => (
    <View key={item._id} className="mb-4">
      <View className="flex-row items-center">
        <Image
          source={{ uri:  'https://via.placeholder.com/150' }}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-3">
          <Text className="text-main font-bold">{item.userId}</Text>
          <Text className="text-gray-400">{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </View>
      </View>
      <View className="flex justify-start items-start ml-10 mt-2">
        <Text className="text-white text-xl italic font-bold">{item.message}</Text>
      </View>
      <View className="my-4">
        <Image
          source={{ uri: item.postImage || 'https://via.placeholder.com/500' }}
          className="w-full h-72 rounded-lg"
          resizeMode="cover"
        />
      </View>
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row space-x-4">
          <TouchableOpacity className="flex-row items-center" onPress={() => toggleLike(item._id)}>
            <HeartIcon size={22} color={item.lc ? '#de3163' : 'tan'} />
            <Text className="text-white ml-1">{item.like || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center" onPress={() => setIsCommentOpen(!isCommentOpen)}>
            <ChatBubbleLeftRightIcon size={22} color="tan" />
            <Text className="text-white ml-1">{item.comments?.length || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Share", "Share feature coming soon...")}>
            <ShareIcon size={22} color="tan" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-1 px-4">
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          placeholderTextColor="gray"
          className="bg-gray-700 p-2 rounded-lg text-white"
        />
        <TouchableOpacity onPress={() => handleAddComment(item._id)} className="mt-2 bg-main p-2 rounded-lg mb-7">
          <Text className="text-white text-center">Post Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="bg-blackk flex-1">
      {isCommentOpen && (
        <ScrollView className="absolute bottom-0 w-full h-[50%] bg-darkmainn p-4 rounded-3xl shadow-lg z-30 ">
          <TouchableOpacity className="flex justify-end items-end" onPress={() => setIsCommentOpen(!isCommentOpen)}>
            <Text className="underline">Close</Text>
          </TouchableOpacity>
          
        </ScrollView>
      )}
      <View className="flex-row items-center justify-between px-4 mt-2 h-[60px]">
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl">
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold flex-1 text-center text-white">Post</Text>
        <View className="relative">
          <Image
            source={image || { uri: post?.postImage || 'https://via.placeholder.com/150' }}
            className="w-10 h-10 rounded-full"
          />
        </View>
      </View>
      <View className="bg-gray-400 w-full h-[2px] mb-3" />
      <FlatList
        data={blogs}
        renderItem={renderBlogItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity
        onPress={() => router.push('/addblog')}
        className="absolute bottom-6 right-6 bg-main p-4 rounded-full"
      >
        <PencilSquareIcon size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default BlogPost;
