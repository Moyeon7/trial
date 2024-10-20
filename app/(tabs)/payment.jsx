import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useCreatePaymentIntentMutation } from './components/apiSlice';
import { useStripe } from '@stripe/stripe-react-native'
import { getUserEmail } from '../(auth)/sign-in';
// this for signup
import { getnewUserEmail } from '../(auth)/sign-up';

const Payment = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [paymentMode, setPaymentMode] = useState('');
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [amount, setAmount] = useState(0); // This will be updated via useEffect
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const emaill = getUserEmail();
  const nemail = getnewUserEmail();

  const email = nemail || emaill;

  const onCheckout = async () => {
    if (!paymentMode || !address) {
      return Alert.alert('Error', 'Please select a payment mode and enter your address.');
    } else {
      Alert.alert(`Payment Mode: ${paymentMode}\nAddress: ${address}`);
      // You can proceed with your submission logic here
    }

    if (paymentMode === 'Cash') {
      Alert.alert('Success', `Order placed successfully!\nPayment Mode: ${paymentMode}\nAddress: ${address}`);
      // Move cart items to order history
      moveCartToOrderHistory(email);
      setAmount(0);
      setAddress('');
      setPaymentMode('');
      return; // Exit early after placing the order
    }

    // Create Payment Intent
    const response = await createPaymentIntent({
      amount: Math.floor(amount * 100), // Amount in cents for Stripe
    });

    if(amount<=30){
      Alert.alert('ALert','Card option not available for less than 30');
      return;
    }

    if (response.error) {
      Alert.alert('Something went wrong');
      return;
    }

    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'kafe',
      paymentIntentClientSecret: response.data.paymentIntent,
    });

    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(`Error code: ${paymentResponse.error.code}`, paymentResponse.error.message);
      return;
    }
    
    // Store payment details in the backend
    try {
      const paymentResponse = await fetch('http://192.168.0.106:5001/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, 
          amount: parseFloat(amount), 
        //   paymentMode, 
          address, 
        }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentResponse.ok) {
        Alert.alert('Payment successful!', 'Thank you for your purchase!');
        moveCartToOrderHistory(email);
      } else {
        Alert.alert('Failed to save payment', paymentData.error || 'An error occurred');
      }

    } catch (error) {
      Alert.alert('Network error', 'Could not save payment details');
    }

    // Reset input fields after a successful payment
    setAmount(0);
    setAddress('');
    setPaymentMode('');
  };

  const getCartItems = async () => {
    try {
      const response = await axios.get(`http://192.168.0.106:5001/cart/${email}`);
      
      if (response.status === 200) {
        console.log('Cart items:', response.data.data); // Log the cart items
        setCartItems(response.data.data); // Set cart items to state
        // Check if the cart is empty
        if (response.data.data.length === 0) {
          Alert.alert('Cart is empty', 'No items found in your cart.'); // Alert for empty cart
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.log('Cart not found, treating as empty');
          Alert.alert('Cart is empty', 'No items found in your cart.'); // Alert for empty cart
        } else {
          console.error('Error fetching cart items:', error.response.data);
          Alert.alert('Error fetching cart items:', error.response.data.message || 'An error occurred.');
        }
      } else {
        console.error('Error fetching cart items:', error.message);
        Alert.alert('Error fetching cart items:', 'Network error. Please try again later.');
      }
    }
  };


  useEffect(() => {
    getCartItems(email);
  }, [email]);

  const removeCartItem = async (itemId) => {
    if (!itemId) {
      console.error('Invalid itemId', { itemId });
      return; // Exit early if itemId is invalid
    }

    console.log('Removing item with ID:', itemId);

    const url = `http://192.168.0.106:5001/cart/remove/${email}/${itemId}`;
    console.log('Sending delete request to:', url);

    try {
      const response = await axios.delete(url);
      console.log('Item removed successfully', response.data);

      // Update cartItems state by filtering out the removed item
      setCartItems((prevItems) => prevItems.filter(item => item.itemId !== itemId));

    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Item not found in cart');
        Alert.alert('Error', 'Item not found in cart.');
      } else {
        console.error('Error removing item:', error.response ? error.response.data : error.message);
        Alert.alert('Error removing item:', 'An error occurred while removing the item.');
      }
    }
  };

  const moveCartToOrderHistory = async (email) => {
    if(cartItems.length===0){
      Alert.alert('Empty', 'No items found in your cart.');
      return;
    }
    try {
        const response = await axios.post(`http://192.168.0.106:5001/cart/move-to-order-history/${email}`, { items: cartItems });
        if (response.status === 200) { // Check for status 200
            console.log('Cart moved to order history successfully:', response.data);
            Alert.alert('Success', 'Your cart has been moved to order history!');
            setCartItems([]); // Clear the cart
        }
    } catch (error) {
        console.error('Error moving cart to order history:', error);
        Alert.alert('Error', 'Failed to move cart to order history.');
    }
};

  const calculateTotalBill = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.itemPrice * item.itemQuantity;
      const extrasTotal = item.extras?.reduce((extrasSum, extra) => {
        return extrasSum + (extra.price * extra.quantity);
      }, 0) || 0;
      return total + itemTotal + extrasTotal;
    }, 0).toFixed(2); // Use toFixed to format to 2 decimal places
  };

  useEffect(() => {
    const totalBill = calculateTotalBill();
    setAmount(totalBill);
  }, [cartItems]);


  return (
    <SafeAreaView className="bg-blackk flex-1">
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="relative pt-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-0 left-0 bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-0 z-30"
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Display Cart Items */}
        <View className="px-4 mt-6 mb-4 py-4">
          <Text className="text-white  font-bold mb-1">Cart Items:</Text>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <View key={index} className="flex-row justify-between items-center">
                <View>
                  <Text className="text-white">
                    {item.itemName} - ₹{item.itemPrice !== undefined ? item.itemPrice.toFixed(2) : 'N/A'}{' '}
                    ({item.itemQuantity})
                  </Text>

                  {/* Display extras if they exist */}
                  {item.extras && item.extras.length > 0 && (
                    <View className="ml-4">
                      <Text className="text-white ">Extras:</Text>
                      {item.extras.map((extra, extraIndex) => (
                        <Text key={extraIndex} className="text-white">
                          {extra.name} - ₹{extra.price.toFixed(2)} x {extra.quantity}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
                
                <TouchableOpacity 
                  onPress={() => removeCartItem(item.itemId)} 
                  className="bg-main p-1 mb-2 rounded-lg w-20 items-center color-main"
                >
                  <Text className="text-white text-center">Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text className="text-white">No items in the cart.</Text>
          )}

          {cartItems.length > 0 && (
            <Text className="text-white text-lg font-bold mt-4">
              Total Bill: ₹{calculateTotalBill()}
            </Text>
          )}
          
        </View>


        {/* Address Input */}
        <Text className="text-white text-lg font-bold ml-6 mt-5">Enter your address:</Text>
        <View className="flex justify-center items-center w-full mx-auto mb-2 px-4 py-4">
          <View className="bg-zinc-800 w-[300px] h-[140px] rounded-3xl">
            <TextInput
              className="p-3 flex-1 text-gray-700 rounded-2xl text-left h-full"
              value={address}
              onChangeText={setAddress}  // Fixed event handler for TextInput
              placeholder='Start typing...'
              multiline={true}  // Enable multiline input
              numberOfLines={5}
              style={{ height: '100%', textAlignVertical: 'top', color: 'white' }} // Align text to the top
            />
          </View>
        </View>


        {/* Payment Mode */}
        <View className="flex justify-center items-center">
          <View className=" w-[80%] mb-2 px-4 py-4 mt-6 bg-white rounded-lg">
            <RNPickerSelect
              onValueChange={(value) => setPaymentMode(value)}
              items={[
                { label: 'Credit Card', value: 'Credit Card' },
                { label: 'Cash on Delivery', value: 'Cash' },
              ]}
              style={{
                inputAndroid: {
                  color: 'black', // Set text color for Android picker
                  backgroundColor: '#f3f4f6', // Equivalent to Tailwind's bg-gray-100
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: '#FFFFF', // Tailwind's border-gray-200
                  borderRadius: 8,
                },
                placeholder: {
                  color: 'black', // Placeholder text color (gray-400)
                },
              }}
              placeholder={{ label: 'Select payment mode', value: null }}
            />
          </View>
        </View>


        {/* Submit Button */}
        <View className="flex justify-center items-center px-4 mt-3">
          <TouchableOpacity 
            className="bg-main p-2 rounded items-center w-1/2"
            onPress={onCheckout}
          >
            <Text className="text-blackk text-xl font-semibold">Proceed</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;