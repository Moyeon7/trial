import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { ArrowLeftIcon, HeartIcon, ChatBubbleLeftRightIcon, ShareIcon, PlusIcon, PencilSquareIcon } from 'react-native-heroicons/solid';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import axios from 'axios';
import dayjs from 'dayjs';

const BlogPost = ({ post = {} }) => {
  const navigation = useNavigation();
  const [newComment, setNewComment] = useState('');
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [like, setLike] = useState(0);

  // Fetch blogs when the component mounts
  useEffect(() => {
    getBlogs();
  }, []);

  const addLike = async (blogId) => {
    try {
      const response = await axios.post(`http://192.168.0.106:5001/blogs/${blogId}/like`);
      if (response.status === 200) {
        // Update the blog's like count in the local state
        setBlogs(blogs.map(blog => blog._id === blogId ? { ...blog, likes: response.data.likes } : blog));
      }
    } catch (error) {
      console.log('Error adding like:', error);
      Alert.alert('Error', 'Unable to add like. Please try again later.');
    }
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get('http://192.168.0.106:5001/blogs');
      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error fetching blogs:', 'Network error. Please try again later.');
    }
  };

  const handleAddComment = (blogId) => {
    if (newComment.trim()) {
      // Here, you would send the comment to the server based on the blogId
      console.log(`Adding comment to blog ${blogId}: ${newComment}`);
      setNewComment('');
    }
  };

  const renderBlogItem = ({ item }) => (
    <View key={item._id} className="mb-4">
      <View className="flex-row items-center">
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-3">
          <Text className="text-main font-bold">{item.userId}</Text>
          <Text className="text-gray-400">{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </View>
      </View>
      {/* Caption */}
      <View className="flex justify-start items-start ml-10 mt-2">
        <Text className="text-white text-xl italic font-bold">{item.message}</Text>
      </View>
      {/* Post Image */}
      <View className="my-4">
        <Image
          source={{ uri: item.postImage || 'https://via.placeholder.com/500' }}
          className="w-full h-72 rounded-lg"
          resizeMode="cover"
        />
      </View>
  
      {/* Post Actions */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row space-x-4">
          {/* Like Button */}
          <TouchableOpacity className="flex-row items-center" onPress={() => addLike(item._id)}>
            <HeartIcon size={22} color="tan" />
            <Text className="text-white ml-1">{item.likes || 0}</Text>
          </TouchableOpacity>
  
          {/* Comment Button */}
          <TouchableOpacity className="flex-row items-center">
            <ChatBubbleLeftRightIcon size={22} color="tan" />
            <Text className="text-white ml-1">{item.comments?.length || 0}</Text>
          </TouchableOpacity>
  
          {/* Share Button */}
          <TouchableOpacity>
            <ShareIcon size={22} color="tan" />
          </TouchableOpacity>
        </View>
      </View>
  
      {/* Add Comment Section */}
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
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-2 h-[60px]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl"
        >
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold flex-1 text-center text-white">Post</Text>

        {/* User Profile Image */}
        <View className="relative">
          <Image
            source={{ uri: post?.postImage || 'https://via.placeholder.com/150' }}
            className="w-10 h-10 rounded-full"
          />
        </View>
      </View>

      {/* Line */}
      <View className="bg-gray-400 w-full h-[2px] mb-3" />

      {/* Main content as FlatList */}
      <FlatList
        data={blogs}
        renderItem={renderBlogItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text className="text-white text-center">No blogs available.</Text>}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Create Post Button */}
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
