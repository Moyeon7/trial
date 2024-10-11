import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledImage = styled(Animated.Image);
const Button = styled(TouchableOpacity);

const SlidingImages = ({ images, isMainSlider = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');

  const imageWidth = isMainSlider ? width * 0.9 : width * 0.45;
  const imageHeight = (imageWidth / 250) * 200;

  useEffect(() => {
    if (isMainSlider) {
      const interval = setInterval(() => {
        nextImage();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentImageIndex, isMainSlider]);

  const nextImage = () => {
    if (isMainSlider) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      animateImage();
    } else {
      // Ensure not to scroll past the last image
      const nextIndex = (currentImageIndex + 1) % images.length;
      scrollViewRef.current.scrollTo({
        x: nextIndex * (imageWidth + 20),
        animated: true,
      });
      setCurrentImageIndex(nextIndex);
    }
  };

  const prevImage = () => {
    if (isMainSlider) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      animateImage();
    } else {
      const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
      scrollViewRef.current.scrollTo({
        x: prevIndex * (imageWidth + 20),
        animated: true,
      });
      setCurrentImageIndex(prevIndex);
    }
  };

  const animateImage = () => {
    translateXAnim.setValue(0);
    Animated.timing(translateXAnim, {
      toValue: -imageWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      translateXAnim.setValue(imageWidth);
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (isMainSlider) {
    return (
      <View className="flex justify-center items-center relative pl-1">
        <StyledImage
          source={images[currentImageIndex]}
          style={{
            width: imageWidth,
            height: imageHeight,
            transform: [{ translateX: translateXAnim }],
          }}
          resizeMode="cover"
        />

        {/* Dot Indicator */}
        <View className="absolute bottom-5 flex-row justify-center w-full">
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: currentImageIndex === index ? '#FFF' : '#AAA',
                marginHorizontal: 5,
              }}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <>
      <View className="relative">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {images.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => openModal(index)}>
              <StyledImage
                source={item}
                style={{ width: imageWidth, height: imageHeight, marginHorizontal: 10 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Adjusted navigation buttons inside the image */}
        <View className="absolute w-full h-full justify-center">
          <Button
            onPress={prevImage}
            style={{
              position: 'absolute',
              left: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: 10,
              borderRadius: 50,
              elevation: 5,
            }}
          >
            <Icon name="arrow-back-ios" size={24} color="#000" />
          </Button>
          <Button
            onPress={nextImage}
            style={{
              position: 'absolute',
              right: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: 10,
              borderRadius: 50,
              elevation: 5,
            }}
          >
            <Icon name="arrow-forward-ios" size={24} color="#000" />
          </Button>
        </View>
      </View>

      {/* Modal for expanded view */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View className="flex-1 justify-center items-center bg-blackk bg-opacity-75 pl-1">
          <StyledImage
            source={images[currentImageIndex]}
            style={{
              width: width * 0.95,  // Increase the image size in modal
              height: (width * 0.95 / 250) * 300,  // Adjust height proportionally
            }}
            resizeMode="contain"
          />
          <Button onPress={closeModal} className="absolute top-10 right-10 bg-white p-2 rounded">
            <Icon name="close" size={24} color="#000" />
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default SlidingImages;