<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
// this for signin
import { getUserEmail } from '../(auth)/sign-in';
//this for signup
import { getnewUserEmail } from '../(auth)/sign-up';

const MenuItems = ({ items }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [extrasQuantities, setExtrasQuantities] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  
  const openModal = (item) => {
    setSelectedItem(item);
    setExtrasQuantities({});
    setQuantity(1);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const updateExtraQuantity = (extra, increment) => {
    setExtrasQuantities((prev) => {
      const newQuantity = (prev[extra.name] || 0) + increment;
      if (newQuantity < 0) return prev;
      return { ...prev, [extra.name]: newQuantity };
    });
  };

const emaill = getUserEmail();
const nemail = getnewUserEmail();

const addToCart = async (itemId, itemName, itemPrice, itemQuantity, extras) => {
  if (!itemId) {
    Alert.alert('Error', 'Item ID is required to add to cart.');
    return;
  }

  // Filter out extras that have been selected (i.e., quantities > 0) and prepare their data
  const selectedExtras = Object.entries(extras)
    .filter(([extraName, quantity]) => quantity > 0) // Only include extras with quantity > 0
    .map(([extraName, quantity]) => ({
      name: extraName,
      quantity: quantity,
      // Find the price of the extra in the selectedItem.extras array
      price: selectedItem.extras.find(extra => extra.name === extraName)?.price || 0,
    }));

  // Prepare the cart data, conditionally set the email to nemail or emaill
  const cartData = {
    itemId: itemId,
    itemName: itemName,
    itemPrice: itemPrice,
    itemQuantity: itemQuantity,
    extras: selectedExtras,
    email: nemail || emaill, // Use nemail if it exists, otherwise emaill
  };

  try {
    const response = await axios.post('http://192.168.0.106:5001/cart/add', cartData);

    if (response.status === 201) {
      console.log('Item added to cart successfully');
      Alert.alert('Success', `${itemName} has been added to your cart!`);
    }
  } catch (error) {
    if (error.response) {
      console.error('Error adding item to cart:', error.response.data);
      Alert.alert('Error', error.response.data.message || 'An error occurred while adding item to cart.');
    } else {
      console.error('Error adding item to cart:', error.message);
      Alert.alert('Error', 'Network error. Please try again later.');
    }
  }
};

const removeCartItem = async (itemId) => {
  try {
    const response = await axios.delete(`http://192.168.0.106:5001/cart/remove/${userId}/${itemId}`);
    if (response.status === 200) {
      // Filter out the removed item from cartItems
      setCartItems(cartItems.filter(item => item.itemId !== parseInt(itemId))); // Ensure you're comparing with an integer
      Alert.alert('Success', 'Item removed from cart.');
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error removing item:', error);
    Alert.alert('Error', 'Error removing item');
  }
};

  return (
    <View>
      {items.length > 0 ? (
        <ScrollView>
          {items.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => openModal(item)}
              className="bg-blackk flex-row items-center my-2 p-2"
            >
              <Image source={item.image} className="w-40 h-40 mr-3" />
              <View>
                <Text className="text-white text-lg">{item.name}</Text>
                <Text className="text-white">{item.price}₹</Text>
                <View className="flex-row items-center">
                  <Text className="text-white mr-1">{item.rating}</Text>
                  <FontAwesome name="star" size={16} color="yellow" />
                </View>
                <Image
                  source={item.isVeg ? require('../(menudependencies)/menuimgs/veg1.png') : require('../(menudependencies)/menuimgs/nonveg1.webp')}
                  className="w-4 h-4"
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <Text className="text-white">No items found</Text>
      )}

      {selectedItem && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View className="flex-1 bg-blackk bg-opacity-100">
            <View className="bg-blackk p-5 w-full h-full relative">
              <View className="relative pt-5">
                <TouchableOpacity
                  onPress={closeModal}
                  className="absolute top-0 left-0 bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-0 z-30"
                >
                  <ArrowLeftIcon size={20} color="black" />
                </TouchableOpacity>
              </View>

              <View className="flex-1 pt-4">
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
                  <View className="bg-blackk flex-row items-center my-2 p-2">
                    <Image 
                      source={selectedItem.image} 
                      className="w-full h-[300px] my-4" 
                      style={{ resizeMode: 'contain' }} 
                    />
                  </View>

                  <Text className="text-2xl font-bold color-white my-4">{selectedItem.name}</Text>
                  <Text className="color-white">{selectedItem.description}</Text>
                  <Text className="mt-1  color-white">Ingredients: {selectedItem.ingredient}</Text>

                  {selectedItem.extras && selectedItem.extras.length > 0 && (
                    <Text className="mt-4 text-lg font-bold color-white">Choose Extras:</Text>
                  )}

                  {selectedItem.extras?.map((extra, index) => (
                    <View key={index} className="flex-row justify-between items-center my-2">
                      <Text className="text-white text-base">{extra.name}</Text> 
                      <Text className="text-white text-base">₹{extra.price}</Text>
                      <View className="flex-row items-center space-x-4">
                        <TouchableOpacity
                          onPress={() => updateExtraQuantity(extra, -1)}
                          className="w-10 h-10 rounded-md bg-main justify-center items-center border border-gray shadow-sm"
                        >
                          <Text className="text-blackk text-base font-bold">-</Text>
                        </TouchableOpacity>

                        <Text className="text-white text-base font-semibold">{extrasQuantities[extra.name] || 0}</Text>

                        <TouchableOpacity
                          onPress={() => updateExtraQuantity(extra, 1)}
                          className="w-10 h-10 rounded-md bg-main justify-center items-center border border-gray"
                        >
                          <Text className="text-blackk text-base font-bold">+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                  {/* Quantity Section */}
                </ScrollView>
                <View className="flex-row items-center justify-between my-4">
                  <View className="flex-row bg-white items-center rounded-lg  p-1">
                    <TouchableOpacity
                      onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-10 h-10 rounded-full  justify-center items-center border border-gray-400"
                    >
                      <Text className="text-black text-lg font-bold">-</Text>
                    </TouchableOpacity>
                    
                    <Text className="mx-6 text-black text-lg font-bold">{quantity}</Text>
                    
                    <TouchableOpacity
                      onPress={() => setQuantity((prev) => prev + 1)}
                      className="w-10 h-10 rounded-full  justify-center items-center border border-gray-400"
                    >
                      <Text className="text-black text-lg font-bold">+</Text>
                    </TouchableOpacity>
                  </View>
         <TouchableOpacity
                onPress={() => addToCart(selectedItem.id, selectedItem.name, selectedItem.price, quantity, extrasQuantities)}
                className="bg-main rounded-lg py-3 items-center flex-1 max-w-xs"
                style={{ marginLeft: 10 }} 
              >
  <Text className="text-blackk text-lg">Add to Cart</Text>
</TouchableOpacity>

                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

=======
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
// this for signin
import { getUserEmail } from '../(auth)/sign-in';
//this for signup
import { getnewUserEmail } from '../(auth)/sign-up';

const MenuItems = ({ items }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [extrasQuantities, setExtrasQuantities] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  
  const openModal = (item) => {
    setSelectedItem(item);
    setExtrasQuantities({});
    setQuantity(1);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const updateExtraQuantity = (extra, increment) => {
    setExtrasQuantities((prev) => {
      const newQuantity = (prev[extra.name] || 0) + increment;
      if (newQuantity < 0) return prev;
      return { ...prev, [extra.name]: newQuantity };
    });
  };

const emaill = getUserEmail();
const nemail = getnewUserEmail();

const addToCart = async (itemId, itemName, itemPrice, itemQuantity, extras) => {
  if (!itemId) {
    Alert.alert('Error', 'Item ID is required to add to cart.');
    return;
  }

  // Filter out extras that have been selected (i.e., quantities > 0) and prepare their data
  const selectedExtras = Object.entries(extras)
    .filter(([extraName, quantity]) => quantity > 0) // Only include extras with quantity > 0
    .map(([extraName, quantity]) => ({
      name: extraName,
      quantity: quantity,
      // Find the price of the extra in the selectedItem.extras array
      price: selectedItem.extras.find(extra => extra.name === extraName)?.price || 0,
    }));

  // Prepare the cart data, conditionally set the email to nemail or emaill
  const cartData = {
    itemId: itemId,
    itemName: itemName,
    itemPrice: itemPrice,
    itemQuantity: itemQuantity,
    extras: selectedExtras,
    email: nemail || emaill, // Use nemail if it exists, otherwise emaill
  };

  try {
    const response = await axios.post('http://192.168.0.106:5001/cart/add', cartData);

    if (response.status === 201) {
      console.log('Item added to cart successfully');
      Alert.alert('Success', `${itemName} has been added to your cart!`);
    }
  } catch (error) {
    if (error.response) {
      console.error('Error adding item to cart:', error.response.data);
      Alert.alert('Error', error.response.data.message || 'An error occurred while adding item to cart.');
    } else {
      console.error('Error adding item to cart:', error.message);
      Alert.alert('Error', 'Network error. Please try again later.');
    }
  }
};

const removeCartItem = async (itemId) => {
  try {
    const response = await axios.delete(`http://192.168.0.106:5001/cart/remove/${userId}/${itemId}`);
    if (response.status === 200) {
      // Filter out the removed item from cartItems
      setCartItems(cartItems.filter(item => item.itemId !== parseInt(itemId))); // Ensure you're comparing with an integer
      Alert.alert('Success', 'Item removed from cart.');
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error removing item:', error);
    Alert.alert('Error', 'Error removing item');
  }
};

  return (
    <View>
      {items.length > 0 ? (
        <ScrollView>
          {items.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => openModal(item)}
              className="bg-blackk flex-row items-center my-2 p-2"
            >
              <Image source={item.image} className="w-40 h-40 mr-3" />
              <View>
                <Text className="text-white text-lg">{item.name}</Text>
                <Text className="text-white">{item.price}₹</Text>
                <View className="flex-row items-center">
                  <Text className="text-white mr-1">{item.rating}</Text>
                  <FontAwesome name="star" size={16} color="yellow" />
                </View>
                <Image
                  source={item.isVeg ? require('../(menudependencies)/menuimgs/veg1.png') : require('../(menudependencies)/menuimgs/nonveg1.webp')}
                  className="w-4 h-4"
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <Text className="text-white">No items found</Text>
      )}

      {selectedItem && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View className="flex-1 bg-blackk bg-opacity-100">
            <View className="bg-blackk p-5 w-full h-full relative">
              <View className="relative pt-5">
                <TouchableOpacity
                  onPress={closeModal}
                  className="absolute top-0 left-0 bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-0 z-30"
                >
                  <ArrowLeftIcon size={20} color="black" />
                </TouchableOpacity>
              </View>

              <View className="flex-1 pt-4">
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
                  <View className="bg-blackk flex-row items-center my-2 p-2">
                    <Image 
                      source={selectedItem.image} 
                      className="w-full h-[300px] my-4" 
                      style={{ resizeMode: 'contain' }} 
                    />
                  </View>

                  <Text className="text-2xl font-bold color-white my-4">{selectedItem.name}</Text>
                  <Text className="color-white">{selectedItem.description}</Text>
                  <Text className="mt-1  color-white">Ingredients: {selectedItem.ingredient}</Text>

                  {selectedItem.extras && selectedItem.extras.length > 0 && (
                    <Text className="mt-4 text-lg font-bold color-white">Choose Extras:</Text>
                  )}

                  {selectedItem.extras?.map((extra, index) => (
                    <View key={index} className="flex-row justify-between items-center my-2">
                      <Text className="text-white text-base">{extra.name}</Text> 
                      <Text className="text-white text-base">₹{extra.price}</Text>
                      <View className="flex-row items-center space-x-4">
                        <TouchableOpacity
                          onPress={() => updateExtraQuantity(extra, -1)}
                          className="w-10 h-10 rounded-md bg-main justify-center items-center border border-gray shadow-sm"
                        >
                          <Text className="text-blackk text-base font-bold">-</Text>
                        </TouchableOpacity>

                        <Text className="text-white text-base font-semibold">{extrasQuantities[extra.name] || 0}</Text>

                        <TouchableOpacity
                          onPress={() => updateExtraQuantity(extra, 1)}
                          className="w-10 h-10 rounded-md bg-main justify-center items-center border border-gray"
                        >
                          <Text className="text-blackk text-base font-bold">+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                  {/* Quantity Section */}
                </ScrollView>
                <View className="flex-row items-center justify-between my-4">
                  <View className="flex-row bg-white items-center rounded-lg  p-1">
                    <TouchableOpacity
                      onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-10 h-10 rounded-full  justify-center items-center border border-gray-400"
                    >
                      <Text className="text-black text-lg font-bold">-</Text>
                    </TouchableOpacity>
                    
                    <Text className="mx-6 text-black text-lg font-bold">{quantity}</Text>
                    
                    <TouchableOpacity
                      onPress={() => setQuantity((prev) => prev + 1)}
                      className="w-10 h-10 rounded-full  justify-center items-center border border-gray-400"
                    >
                      <Text className="text-black text-lg font-bold">+</Text>
                    </TouchableOpacity>
                  </View>
         <TouchableOpacity
                onPress={() => addToCart(selectedItem.id, selectedItem.name, selectedItem.price, quantity, extrasQuantities)}
                className="bg-main rounded-lg py-3 items-center flex-1 max-w-xs"
                style={{ marginLeft: 10 }} 
              >
  <Text className="text-blackk text-lg">Add to Cart</Text>
</TouchableOpacity>

                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

>>>>>>> 1b425caee791463b3c48f72f255386d0a0db0adc
export default MenuItems;