import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));

  const screenWidth = Dimensions.get('window').width;

  // Define pastel colors
  const pastelColors = ['#FFB6C1', '#ADD8E6', '#98FB98', '#FFD700', '#E0BBE4', '#FFA07A', '#B0E0E6'];

  useEffect(() => {
    const bubbleAnimations = [];
    const bubbleDelays = [0, 200, 400, 600, 800, 1000, 1200]; // Adjust the delays as needed

    // Create a looping animation for each letter with a popping effect
    'EVENTPRO'.split('').forEach((letter, index) => {
      const bubbleAnim = Animated.loop(
        Animated.sequence([
          Animated.delay(bubbleDelays[index]),
          Animated.spring(animation, {
            toValue: 1,
            friction: 2, // Adjust the friction for the popping effect
            tension: 100, // Adjust the tension for the popping effect
            useNativeDriver: false,
          }),
        ])
      );
      bubbleAnimations.push(bubbleAnim);
    });

    // Start the letter popping animations in parallel
    Animated.parallel(bubbleAnimations).start();

    // Use a setTimeout to navigate to the "boarding1" screen after a delay
    const timer = setTimeout(() => {
      navigation.navigate('Boarding1');
    }, 5000); // Total animation duration

    // Clear the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [navigation, animation]);

  // Function to get a random pastel color from the defined array
  const getRandomPastelColor = () => {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  };

  return (
    <View style={styles.container}>
      <Image source={require("./pictures/Balloons.jpg")} style={styles.logo} />
      <View style={styles.textContainer}>
        {'EVENTPRO'.split('').map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.text,
              {
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.7, 1], // Adjust the scale for the bubble effect
                    }),
                  },
                ],
                backgroundColor: getRandomPastelColor(), // Use a random pastel color
                borderRadius: screenWidth / 20, // Make it more circular
                width: screenWidth / 12, // Adjust the width to make it smaller
                height: screenWidth / 12, // Adjust the height to make it smaller
                marginHorizontal: 5, // Adjust the spacing between letters
                justifyContent: 'center', // Center text vertically
                alignItems: 'center', // Center text horizontally
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: Dimensions.get('window').width * 0.25,
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SplashScreen;
