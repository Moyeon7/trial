import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';
import { getUserEmail } from '../(auth)/sign-in';
import { getnewUserEmail } from '../(auth)/sign-up';

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a number between 100000 and 999999
};

const emaill = getUserEmail();
const nemail = getnewUserEmail();
const email = nemail || emaill;

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
  
    const getOrderHistory = async (email) => {
      try {
        const response = await axios.get(`http://192.168.0.106:5001/order-history/${email}`);
        if (response.status === 200) {
          console.log('Order history:', response.data.data);
          setOrders(response.data.data);
          if (response.data.data.length === 0) {
            Alert.alert('No orders found', 'You have no order history.');
          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            Alert.alert('No orders found', 'You have no order history.');
          } else {
            console.error('Error fetching order history:', error.response.data);
            Alert.alert('Error fetching order history:', error.response.data.message || 'An error occurred.');
          }
        } else {
          console.error('Error fetching order history:', error.message);
          Alert.alert('Error fetching order history:', 'Network error. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchEmailAndOrderHistory = () => {
        const emaill = getUserEmail();
        const nemail = getnewUserEmail();
        const userEmail = nemail || emaill;
  
        if (userEmail && isMounted) {
          setEmail(userEmail); // Set the email
          getOrderHistory(userEmail); // Fetch order history using the email
        }
      };
  
      fetchEmailAndOrderHistory();
  
      return () => {
        isMounted = false;
      };
    }, []);
  
    if (loading) {
      return <Text className="text-white">Loading...</Text>;
    }
  
    return (
      <ScrollView className="flex-1 bg-blackk p-4">
        {/* Top Section with Arrow and Rating */}
        <View className="flex-row justify-start mt-4 ml-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl"
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex items-center">
          <Text className="text-2xl font-bold mb-4 text-white">Order History</Text>
        </View>
        {orders.length === 0 ? (
          <Text className="text-white">No orders found.</Text>
        ) : (
          orders.map((order) => (
            <View key={order.orderId} className="mb-5 p-2 border border-gray-300 rounded-lg bg-gray-800">
              <Text className="text-xl font-bold text-white">Order Date: {new Date(order.orderDate).toLocaleString()}</Text>
              <Text className="text-white">Email: {order.email}</Text>
              <Text className="text-white">Total Amount: ₹{order.totalAmount.toFixed(2)}</Text>
              <Text className="text-xl font-bold text-white mt-2">Items:</Text>
              {order.items.map((item, index) => (
                <View key={index} className="my-1">
                  <Text className="text-white">{item.itemName} (Quantity: {item.itemQuantity}) - ₹{item.itemPrice.toFixed(2)}</Text>
                  {item.extras.length > 0 && (
                    <View className="ml-2">
                      {item.extras.map((extra, idx) => (
                        <Text key={idx} className="text-white">
                          Extra: {extra.name} - ₹{extra.price.toFixed(2)} (Quantity: {extra.quantity})
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    );
  };
  
  export default OrderHistory;
  