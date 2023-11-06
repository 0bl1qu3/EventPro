import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SecondBoardingScreen = () => {
  const navigation = useNavigation();

  // Function to navigate to the next screen (e.g., the main app screen)
  const handleNext = () => {
    // You can navigate to the main app screen here.
    // For now, let's assume the main app screen is named "MainAppScreen."
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
     <Text style={styles.heading}>Plan the Best Parties!</Text>
      <Image source={require("./pictures/Boarding3pic.png")} style={styles.image} />

      <Text style={styles.text}>
        With a variety of features and tools, you can create the perfect event tailored to your unique style and needs...
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Start Planning</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    
  },
  image: {
    width: 300, // Adjust the image size as needed
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
    backgroundColor: "coral",
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SecondBoardingScreen;
