import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation, router } from 'expo-router';

const ContactScreen = () => {
  return (
    <View className="flex-1 bg-blackk justify-start items-center p-4">
      {/* Top Section with Arrow */}
      <View className="absolute top-7 left-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl"
        >
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Social Media Links */}
      <TouchableOpacity className="flex-row items-center mb-4 mt-20" onPress={() => Linking.openURL('https://instagram.com/kafekoffeeknight')}>
        <Ionicons name="logo-instagram" size={24} color="pink" />
        <Text style={{ fontSize: 18 }} className="text-white ml-2">@kafekoffeeknight</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center mb-4" onPress={() => Linking.openURL('https://www.facebook.com/kafekoffeeknight')}>
        <FontAwesome name="facebook" size={24} color="#3b5998" />
        <Text style={{ fontSize: 18 }} className="text-white ml-2">facebook.com/kafekoffeeknight</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center mb-4" onPress={() => Linking.openURL('mailto:kafekoffeeknight@gmail.com')}>
        <MaterialIcons name="email" size={24} color="red" />
        <Text style={{ fontSize: 18 }} className="text-white ml-2">kafekoffeeknight@gmail.com</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center mb-4" onPress={() => Linking.openURL('tel:+11234567890')}>
        <FontAwesome name="phone" size={24} color="green" />
        <Text style={{ fontSize: 18 }} className="text-white ml-2">+1 (123) 456-7890</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactScreen;
