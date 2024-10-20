<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';
import axios from 'axios';
import { useNavigation, router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-asset';
// this for signin
import { getUserEmail } from '../(auth)/sign-in';
//this for signup
import { getnewUserEmail } from '../(auth)/sign-up';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

const presetImages = [
    require('../../assets/images/Profileimg/preset.png'),
    require('../../assets/images/Profileimg/preset2.png'),
    require('../../assets/images/Profileimg/preset3.png'),
    require('../../assets/images/Profileimg/preset4.png'),
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
    const emaill = getUserEmail();
    const nemail=getnewUserEmail();
    useEffect(() => {
        if (nemail) {
            console.log(" Cest Magnifique :", nemail );
            // Set the new user's email directly when available
            setEmail(nemail);
        }
    }, [nemail]);
    useEffect(() => {
        if (emaill) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`${API_URL}/user-details`, {
                        params: { email: emaill }
                    });
                    const { name, username, email, mobile, profileImage } = response.data.data;

                    setName(name);
                    setUsername(username);
                    setEmail(email);
                    setPhone(mobile);
                    setImage(profileImage ? { uri: profileImage } : null);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                    Alert.alert("Error", "Failed to fetch user details.");
                }
            };
            fetchUserDetails();
        }
    }, [emaill]);

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
            // console.error('Error uploading image:', error.response ? error.response.data : error.message);
           Alert.alert('Error', 'Failed to upload profile picture. Please try again.');
        }
    };

    const handleUpdateProfile = async () => {
        if (isSubmitting || isUsernameTaken) return;
        setIsSubmitting(true);

        const isNameValid = name.length > 0;
        const isEmailValid = /\S+@\S+\.\S+/.test(email);
        const isPhoneValid = phone.length >= 10;

        if (isNameValid && isEmailValid && isPhoneValid) {
            try {
                const res = await axios.post(`${API_URL}/update-profile`, {
                    email: emaill,  // Use the logged-in user's email to find the user
                    name,
                    username,
                    mobile: phone,
                });

                console.log('Backend response:', res.data);

                if (res.data.status === 'ok') {
                    Alert.alert('Success', 'Profile updated successfully!');

                    if (image) {
                        await uploadImage(res.data.data._id, image); // Assuming the response returns the updated user
                    }
                } else {
                    Alert.alert('Error', res.data.message || 'Failed to update profile.');
                }
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message || error.message : 'Profile Registered';
                console.error('Error updating profile:', errorMessage);
                Alert.alert('Error', errorMessage);
            }
        } else {
            Alert.alert('Invalid Input', 'Please fill in all fields correctly.');
        }

        setIsSubmitting(false);
    };

    const handleRegister = async () => {
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

                console.log('Registration response:', res.data);

                if (res.data.status === 'ok') {
                    Alert.alert('Success', 'Registration successful!');
                    navigation.navigate('home'); // Navigate to login after registration
                } else {
                    Alert.alert('Error', res.data.message || 'Registration failed.');
                }
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message || error.message : 'No response from the server. Please try again.';
                console.error('Error during registration:', errorMessage);
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
            <View className="flex-row justify-start">
            <TouchableOpacity onPress={() => router.push('Home')}
              className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
          </View>
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
                    <Feather name="edit" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
                </StyledView>

               <StyledView className="mb-4 relative">
    <StyledTextInput
        value={nemail ? nemail : emaill} // Display nemail if it's available; otherwise, show emaill
        editable={false} // Disable editing email
        placeholder="Email"
        className="bg-[#D2A86E] p-4 rounded-full text-black"
    />
    <Feather name="mail" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
</StyledView>

                <StyledView className="mb-4 relative">
                    <StyledTextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        className="bg-[#D2A86E] p-4 rounded-full text-black"
                    />
                    <Feather name="phone" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
                </StyledView>
            </StyledView>

            {/* Submit Button for Profile Update */}
            <StyledTouchableOpacity
                className="bg-[#D2A86E] rounded-full py-4 mt-6"
                onPress={handleUpdateProfile}
                disabled={isSubmitting}
            >
                <StyledText className="text-center text-black text-lg font-bold">Save Changes</StyledText>
            </StyledTouchableOpacity>

            {/* Registration Button */}
            <StyledTouchableOpacity
                className="bg-[#D2A86E] rounded-full py-4 mt-4"
                onPress={handleRegister}
                disabled={isSubmitting}
            >
                <StyledText className="text-center text-black text-lg font-bold">Register</StyledText>
            </StyledTouchableOpacity>

            {/* Modal for Image Selection */}
            {/* Image Selection Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <StyledView className="flex-1 justify-center items-center bg-black bg-opacity-70">
                    <StyledView className="bg-white p-4 rounded-lg w-4/5">
                        <StyledText className="text-lg text-black font-semibold mb-4">Select a Profile Picture</StyledText>
                        <View className="flex-row justify-center">
                            {presetImages.map((preset, index) => (
                                <TouchableOpacity key={index} onPress={() => handleImageSelect(index)}>
                                    <Image source={preset} className="w-14  h-14 rounded-full m-2" />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <StyledTouchableOpacity
                            className="bg-main p-4 rounded-lg items-center mt-4"
                            onPress={() => setModalVisible(false)}
                        >
                            <StyledText className="text-white text-lg">Close</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </Modal>
        </StyledView>
            
    );
};

=======
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';
import axios from 'axios';
import { useNavigation, router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-asset';
// this for signin
import { getUserEmail } from '../(auth)/sign-in';
//this for signup
import { getnewUserEmail } from '../(auth)/sign-up';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

const presetImages = [
    require('../../assets/images/Profileimg/preset.png'),
    require('../../assets/images/Profileimg/preset2.png'),
    require('../../assets/images/Profileimg/preset3.png'),
    require('../../assets/images/Profileimg/preset4.png'),
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
    const emaill = getUserEmail();
    const nemail=getnewUserEmail();
    useEffect(() => {
        if (nemail) {
            console.log(" Cest Magnifique :", nemail );
            // Set the new user's email directly when available
            setEmail(nemail);
        }
    }, [nemail]);
    useEffect(() => {
        if (emaill) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`${API_URL}/user-details`, {
                        params: { email: emaill }
                    });
                    const { name, username, email, mobile, profileImage } = response.data.data;

                    setName(name);
                    setUsername(username);
                    setEmail(email);
                    setPhone(mobile);
                    setImage(profileImage ? { uri: profileImage } : null);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                    Alert.alert("Error", "Failed to fetch user details.");
                }
            };
            fetchUserDetails();
        }
    }, [emaill]);

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
            // console.error('Error uploading image:', error.response ? error.response.data : error.message);
           Alert.alert('Error', 'Failed to upload profile picture. Please try again.');
        }
    };

    const handleUpdateProfile = async () => {
        if (isSubmitting || isUsernameTaken) return;
        setIsSubmitting(true);

        const isNameValid = name.length > 0;
        const isEmailValid = /\S+@\S+\.\S+/.test(email);
        const isPhoneValid = phone.length >= 10;

        if (isNameValid && isEmailValid && isPhoneValid) {
            try {
                const res = await axios.post(`${API_URL}/update-profile`, {
                    email: emaill,  // Use the logged-in user's email to find the user
                    name,
                    username,
                    mobile: phone,
                });

                console.log('Backend response:', res.data);

                if (res.data.status === 'ok') {
                    Alert.alert('Success', 'Profile updated successfully!');

                    if (image) {
                        await uploadImage(res.data.data._id, image); // Assuming the response returns the updated user
                    }
                } else {
                    Alert.alert('Error', res.data.message || 'Failed to update profile.');
                }
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message || error.message : 'Profile Registered';
                console.error('Error updating profile:', errorMessage);
                Alert.alert('Error', errorMessage);
            }
        } else {
            Alert.alert('Invalid Input', 'Please fill in all fields correctly.');
        }

        setIsSubmitting(false);
    };

    const handleRegister = async () => {
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

                console.log('Registration response:', res.data);

                if (res.data.status === 'ok') {
                    Alert.alert('Success', 'Registration successful!');
                    navigation.navigate('home'); // Navigate to login after registration
                } else {
                    Alert.alert('Error', res.data.message || 'Registration failed.');
                }
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message || error.message : 'No response from the server. Please try again.';
                console.error('Error during registration:', errorMessage);
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
            <View className="flex-row justify-start">
            <TouchableOpacity onPress={() => router.push('Home')}
              className="bg-main p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
          </View>
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
                    <Feather name="edit" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
                </StyledView>

               <StyledView className="mb-4 relative">
    <StyledTextInput
        value={nemail ? nemail : emaill} // Display nemail if it's available; otherwise, show emaill
        editable={false} // Disable editing email
        placeholder="Email"
        className="bg-[#D2A86E] p-4 rounded-full text-black"
    />
    <Feather name="mail" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
</StyledView>

                <StyledView className="mb-4 relative">
                    <StyledTextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        className="bg-[#D2A86E] p-4 rounded-full text-black"
                    />
                    <Feather name="phone" size={20} style={{ position: 'absolute', right: 10, top: 10 }} />
                </StyledView>
            </StyledView>

            {/* Submit Button for Profile Update */}
            <StyledTouchableOpacity
                className="bg-[#D2A86E] rounded-full py-4 mt-6"
                onPress={handleUpdateProfile}
                disabled={isSubmitting}
            >
                <StyledText className="text-center text-black text-lg font-bold">Save Changes</StyledText>
            </StyledTouchableOpacity>

            {/* Registration Button */}
            <StyledTouchableOpacity
                className="bg-[#D2A86E] rounded-full py-4 mt-4"
                onPress={handleRegister}
                disabled={isSubmitting}
            >
                <StyledText className="text-center text-black text-lg font-bold">Register</StyledText>
            </StyledTouchableOpacity>

            {/* Modal for Image Selection */}
            {/* Image Selection Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <StyledView className="flex-1 justify-center items-center bg-black bg-opacity-70">
                    <StyledView className="bg-white p-4 rounded-lg w-4/5">
                        <StyledText className="text-lg text-black font-semibold mb-4">Select a Profile Picture</StyledText>
                        <View className="flex-row justify-center">
                            {presetImages.map((preset, index) => (
                                <TouchableOpacity key={index} onPress={() => handleImageSelect(index)}>
                                    <Image source={preset} className="w-14  h-14 rounded-full m-2" />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <StyledTouchableOpacity
                            className="bg-main p-4 rounded-lg items-center mt-4"
                            onPress={() => setModalVisible(false)}
                        >
                            <StyledText className="text-white text-lg">Close</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </Modal>
        </StyledView>
            
    );
};

>>>>>>> 1b425caee791463b3c48f72f255386d0a0db0adc
export default ProfileScreen;