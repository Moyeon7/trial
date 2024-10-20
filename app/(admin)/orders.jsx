import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { router } from 'expo-router';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrderHistory = async () => {
    try {
      const response = await axios.get('http://192.168.0.106:5001/order-history'); // Adjusted endpoint
      if (response.status === 200) {
        console.log('Order history:', response.data.data); // Log the order history
        setOrders(response.data.data); // Set orders state with the fetched data
        if (response.data.data.length === 0) {
          Alert.alert('No orders found', 'There is no order history available.');
        }
      }
    } catch (error) {
      if (error.response) {
        console.error('Error fetching order history:', error.response.data);
        Alert.alert('Error fetching order history:', error.response.data.message || 'An error occurred.');
      } else {
        console.error('Error fetching order history:', error.message);
        Alert.alert('Error fetching order history:', 'Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsDelivered = async (orderId) => {
    try {
      const response = await axios.post(`http://192.168.0.106:5001/mark-delivered/${orderId}`);
      if (response.status === 200) {
        const updatedOrder = response.data.data; // Assume the updated order is returned
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === updatedOrder._id ? { ...order, delivered: true } : order
          )
        );
        Alert.alert('Success', 'Order marked as delivered.');
        getOrderHistory(); // Refresh the order history
      }
    } catch (error) {
      console.error('Error marking order as delivered:', error.message);
      Alert.alert('Error', 'Could not mark order as delivered. Please try again.');
    }
  };

  const deleteDeliveredOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://192.168.0.106:5001/delete-order/${orderId}`);
      if (response.status === 200) {
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
        Alert.alert('Success', 'Delivered order deleted from history.');
      }
    } catch (error) {
      console.error('Error deleting delivered order:', error.message);
      Alert.alert('Error', 'Could not delete the delivered order. Please try again.');
    }
  };

  const clearDeliveredOrders = () => {
    setOrders((prevOrders) => prevOrders.filter((order) => !order.delivered));
  };

  useEffect(() => {
    getOrderHistory(); 
  }, []);

  if (loading) {
    return <Text className="text-white">Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-blackk p-4">
      <View className="flex-row justify-start mt-4 ml-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl"
        >
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex items-center">
        <Text className="text-2xl font-bold mb-4 text-white">Order Tracking</Text>
      </View>
      {orders.length === 0 ? (
        <Text className="text-white">No orders found.</Text>
      ) : (
        orders.map((order) => (
          <View key={order.orderId} className="mb-5 p-2 border border-gray-300 rounded-lg bg-gray-800">
            <Text className="text-xl font-bold text-white">Order Date: {new Date(order.orderDate).toLocaleString()}</Text>
            <Text className="text-white">Email: {order.email}</Text>
            <Text className="text-white">Total Amount: ₹{order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</Text>
            <Text className="text-xl font-bold text-white mt-2">Items:</Text>
            {order.items.map((item, index) => (
              <View key={index} className="my-1">
                <Text className="text-white">
                  {item.itemName} (Quantity: {item.itemQuantity}) - ₹{item.itemPrice ? item.itemPrice.toFixed(2) : 'N/A'}
                </Text>
                {item.extras.length > 0 && (
                  <View className="ml-2">
                    {item.extras.map((extra, idx) => (
                      <Text key={idx} className="text-white">
                        Extra: {extra.name} - ₹{extra.price ? extra.price.toFixed(2) : 'N/A'} (Quantity: {extra.quantity})
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
            <Text className="text-white">
              {order.delivered ? (
                <Text className="ml-2 text-green-500">Delivered ●</Text>
              ) : (
                <Text className="ml-2 text-red-500">Not Delivered ●</Text>
              )}
            </Text>

            {/* Button to mark as delivered */}
            {!order.delivered && (
              <TouchableOpacity
                onPress={() => markAsDelivered(order.orderId)}
                className="mt-2 p-2 bg-green-500 rounded-lg"
              >
                <Text className="text-white text-center">Mark as Delivered</Text>
              </TouchableOpacity>
            )}

            {/* Button to delete delivered order */}
            {order.delivered && (
              <TouchableOpacity
                onPress={() => deleteDeliveredOrder(order.orderId)}
                className="mt-2 p-2 bg-red-500 rounded-lg"
              >
                <Text className="text-white text-center">Delete Delivered Order</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
      {/* Button to clear delivered orders */}
      <TouchableOpacity
        onPress={clearDeliveredOrders}
        className="mt-4 p-2 bg-orange-400 rounded-lg mb-10"
      >
        <Text className="text-white text-center">Display Non-Delivered Orders</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OrderHistory;
