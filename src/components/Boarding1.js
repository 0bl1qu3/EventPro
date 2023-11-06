import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FirstBoardingScreen = () => {
  const navigation = useNavigation();

  // Function to navigate to the next screen (e.g., the next onboarding step)
  const handleNext = () => {
    // You can navigate to the next screen here.
    // For now, let's assume the next screen is named "SecondBoardingScreen."
    navigation.navigate('Boarding2');
  };

  return (
    <View style={styles.container}>
     <Text style={styles.heading}>Welcome to EventPro!</Text>
      <Image source={require('./pictures/Boarding2pic.jpg')} style={styles.image} />

      
      <Text style={styles.text}>
        EventPro is your go-to app for stress-free party planning. . 
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white"
  },
  image: {
    width: 200, // Adjust the image size as needed
    height: 200, // Adjust the image size as needed
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF', // Adjust the button color
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFB6C1',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FirstBoardingScreen;

