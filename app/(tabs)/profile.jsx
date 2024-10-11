import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-asset';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

const presetImages = [
    require('../../assets/images/Profileimg/preset1-min.png'),
    require('../../assets/images/Profileimg/preset-min.png'),
    require('../../assets/images/Profileimg/preset3-min.png'),
    require('../../assets/images/Profileimg/preset4-min.png'),
];

const ProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const API_URL = "http://192.168.0.106:5001";  // Replace with your actual API URL

    const handleImageSelect = (imageIndex) => {
        const selectedImage = presetImages[imageIndex];
        setImage(selectedImage);
        setModalVisible(false);
    };

    const uploadImage = async (userId, imageSource) => {
        if (!imageSource) {
            console.error('No image selected');
            return;
        }

        try {
            const asset = Asset.fromModule(imageSource);
            await asset.downloadAsync();
            const imageUri = asset.localUri || asset.uri;

            const manipResult = await ImageManipulator.manipulateAsync(
                imageUri,
                [{ resize: { width: 400, height: 400 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );

            const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const payload = {
                userId: userId,
                image: `data:image/jpeg;base64,${base64}`,
            };

            const response = await axios.post(`${API_URL}/upload-image`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Image upload response:', response.data);
            Alert.alert('Success', 'Profile picture uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Failed to upload profile picture. Please try again.');
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting || isUsernameTaken) return;
        setIsSubmitting(true);

        const isNameValid = name.length > 0;
        const isEmailValid = /\S+@\S+\.\S+/.test(email);
        const isPhoneValid = phone.length >= 10;

        if (isNameValid && isEmailValid && isPhoneValid) {
            try {
                const res = await axios.post(`${API_URL}/reg`, {
                    name,
                    username,
                    email,
                    mobile: phone,
                });

                console.log('Backend response:', res.data);

                if (res.data.status === 'ok') {
                    const userId = res.data.userId;
                    Alert.alert('Success', 'Profile registered successfully!');

                    if (image) {
                        await uploadImage(userId, image);
                    }
                } else {
                    setIsUsernameTaken(true);
                    Alert.alert('Error', res.data.data);
                }
            } catch (error) {
                const errorMessage = error.response ? error.response.data.data || error.message : 'No response from the server. Please try again.';
                console.error('Error submitting form:', errorMessage);
                Alert.alert('Error', errorMessage);
            }
        } else {
            Alert.alert('Invalid Input', 'Please fill in all fields correctly.');
        }

        setIsSubmitting(false);
    };

    return (
        <StyledView className="flex-1 bg-black p-4">
            {/* Back Button */}
            <StyledTouchableOpacity
                className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full"
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left" size={24} color="#D2A86E" />
            </StyledTouchableOpacity>

            {/* Profile Picture */}
            <StyledView className="justify-center items-center mt-6">
                <StyledView className="w-40 h-40 bg-gray-800 rounded-full justify-center items-center border-4 border-[#D2A86E]">
                    <StyledImage
                        source={image || require('../../assets/images/Profileimg/pfp.png')}
                        className="w-32 h-32 rounded-full"
                        resizeMode="cover"
                    />
                    <StyledTouchableOpacity
                        className="absolute bottom-0 right-0 p-2 bg-[#D2A86E] rounded-full"
                        onPress={() => setModalVisible(true)}
                    >
                        <Feather name="camera" size={24} color="black" />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            {/* Input Fields */}
            <StyledView className="mt-6">
                <StyledView className="mb-4 relative">
                    <StyledTextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                        className="bg-[#D2A86E] p-4 rounded-full text-black"
                    />
                    <Feather name="edit" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
                </StyledView>
                
                <StyledView className="mb-4 relative">
                    <StyledTextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Username"
                        className="bg-[#D2A86E] p-4 rounded-full text-black"
                    />
                    {isUsernameTaken && <StyledText className="text-red-500">Username is already taken.</StyledText>}
                    <Feather name="edit" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
                </StyledView>

                <StyledView className="mb-4 relative">
                    <StyledTextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        className="bg-[#D2A86E] p-4 rounded-full text-black"
                    />
                    <Feather name="edit" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
                </StyledView>

                <StyledView className="mb-4 relative">
                    <StyledTextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone No."
                        className="bg-[#D2A86E] p-4 rounded-full text-black"
                    />
                    <Feather name="edit" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
                </StyledView>
            </StyledView>

            {/* Submit Button */}
            <StyledTouchableOpacity
                onPress={handleSubmit}
                className="mt-6 bg-[#D2A86E] p-4 rounded-full"
            >
                <StyledText className="text-black text-center">Submit</StyledText>
            </StyledTouchableOpacity>

            {/* Image Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <StyledView className="flex-1 justify-center items-center bg-black bg-opacity-80">
                    <StyledView className="bg-gray-900 rounded p-4">
                        <StyledText className="text-white text-lg mb-4">Select a Profile Picture</StyledText>
                        <StyledView className="flex-row justify-around">
                            {presetImages.map((img, index) => (
                                <StyledTouchableOpacity
                                    key={index}
                                    onPress={() => handleImageSelect(index)}
                                    className="p-2"
                                >
                                    <StyledImage
                                        source={img}
                                        className="w-16 h-16 rounded-full"
                                    />
                                </StyledTouchableOpacity>
                            ))}
                        </StyledView>
                        <StyledTouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="mt-4"
                        >
                            <StyledText className="text-red-500 text-center">Close</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </Modal>
        </StyledView>
    );
};

export default ProfileScreen;