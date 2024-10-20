<<<<<<< HEAD
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar'; 

const orders = () => {
  const navigation = useNavigation();
  const orders = [
    { id: 1, delivered: true },
    { id: 2, delivered: false },
    { id: 3, delivered: true },
  ];
  return (
    <View className="bg-blackk w-full h-full">
        {/* top arrow */}
        <View className="flex-row justify-start mt-[10px]">
            <TouchableOpacity onPress={() => navigation.goBack()}
              className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
        </View>

        <View className="flex-1 bg-blackk p-4 flex items-center">
        <StatusBar style="light" />
        <Text className="text-white text-2xl font-bold mb-4">Still under work</Text>
        </View>

    </View>
  )
}

export default orders
=======
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar'; 

const orders = () => {
  const navigation = useNavigation();
  const orders = [
    { id: 1, delivered: true },
    { id: 2, delivered: false },
    { id: 3, delivered: true },
  ];
  return (
    <View className="bg-blackk w-full h-full">
        {/* top arrow */}
        <View className="flex-row justify-start mt-[10px]">
            <TouchableOpacity onPress={() => navigation.goBack()}
              className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
        </View>

        <View className="flex-1 bg-blackk p-4 flex items-center">
        <StatusBar style="light" />
        <Text className="text-white text-2xl font-bold mb-4">Still under work</Text>
        </View>

    </View>
  )
}

export default orders
>>>>>>> 1b425caee791463b3c48f72f255386d0a0db0adc
