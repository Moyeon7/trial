import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Pressable, Image } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from 'expo-router';
import axios from 'axios';

const Settings = () => {
  const navigation = useNavigation();

  // State for form inputs
  const [form, setForm] = useState({
    id: '',
    name: '',
    image: '',
    rating: '',
    price: '',
    type: '',
    isVeg: null, // Use null initially, as user must select
  });

  // State for products (fetched from the database)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle input changes
  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!form.id || !form.name || !form.image || !form.rating || !form.price || !form.type || form.isVeg === null) {
      Alert.alert('Error', 'Please fill in all fields, including the veg option.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.137.238:5001/api/upload', form);
      if (response.status === 200) {
        Alert.alert('Success', 'Product uploaded successfully!');
        navigation.goBack(); // go back after success
        // fetchProducts(); // Fetch the products again after successful submission
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload product');
    }
  };

  // // Fetch products from the database
  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get('http://192.168.137.238:5001/api/products');
  //     setProducts(response.data); // Assume response data is an array of products
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //     setLoading(false);
  //   }
  // };

  // // Fetch the products when the component mounts
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <ScrollView className="bg-black w-full h-full p-4">
      {/* Top arrow */}
      <View className="flex-row justify-start mt-[10px]">
        <TouchableOpacity onPress={() => navigation.goBack()}
          className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <TextInput
        className="bg-white p-2 rounded my-2"
        placeholder="ID"
        value={form.id}
        onChangeText={(text) => handleChange('id', text)}
      />
      <TextInput
        className="bg-white p-2 rounded my-2"
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        className="bg-white p-2 rounded my-2"
        placeholder="Image URL"
        value={form.image}
        onChangeText={(text) => handleChange('image', text)}
      />
      <TextInput
        className="bg-white p-2 rounded my-2"
        placeholder="Rating"
        keyboardType="numeric"
        value={form.rating}
        onChangeText={(text) => handleChange('rating', text)}
      />
      <TextInput
        className="bg-white p-2 rounded my-2"
        placeholder="Price"
        keyboardType="numeric"
        value={form.price}
        onChangeText={(text) => handleChange('price', text)}
      />
      <TextInput
        className="bg-white p-2 rounded my-2"
        placeholder="Type (e.g., coffee, snack)"
        value={form.type}
        onChangeText={(text) => handleChange('type', text)}
      />

      {/* Radio Buttons for Veg/Non-Veg */}
      <View className="my-2">
        <Text className="text-white mb-2">Is Veg:</Text>
        <View className="flex-row items-center">
          <Pressable onPress={() => handleChange('isVeg', true)} className="flex-row items-center mr-4">
            <View className={`w-4 h-4 rounded-full border-2 ${form.isVeg === true ? 'bg-main' : 'bg-white'} mr-2`} />
            <Text className="text-white">Yes</Text>
          </Pressable>

          <Pressable onPress={() => handleChange('isVeg', false)} className="flex-row items-center">
            <View className={`w-4 h-4 rounded-full border-2 ${form.isVeg === false ? 'bg-main' : 'bg-white'} mr-2`} />
            <Text className="text-white">No</Text>
          </Pressable>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-main p-4 rounded mt-4">
        <Text className="text-center text-white">Upload Product</Text>
      </TouchableOpacity>

      {/* Display the fetched products */}
      {/* <View className="mt-8">
        <Text className="text-white text-lg mb-4">Products List:</Text>
        {loading ? (
          <Text className="text-white">Loading products...</Text>
        ) : (
          products.map((product) => (
            <View key={product.id} className="bg-white p-3 rounded my-2">
              <Text className="font-bold">{product.name}</Text>
              <Image source={{ uri: product.image }} className="w-24 h-24 mt-2" />
              <Text>Price: ${product.price.toFixed(2)}</Text>
              <Text>Rating: {product.rating}/5</Text>
              <Text>Type: {product.type}</Text>
              <Text className={text-sm ${product.isVeg ? 'text-green-500' : 'text-red-500'}}>
                {product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              </Text>
            </View>
          ))
        )}
      </View> */}
    </ScrollView>
  );
};

export default Settings;