import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SuccessfulOrderScreen = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleViewReceiptPress = () => {
    setSelectedButton('ViewReceipt');
    // Navigate to the Receipt screen
    navigation.navigate('ViewReceipt');
  };

  const handleRateOurAppPress = () => {
    setSelectedButton('Reviews');
    // Navigate to the Reviews screen
    navigation.navigate('Reviews');
  };

  return (
    <ImageBackground source={require('./pictures/background1.gif')} resizeMode="cover" style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.orderOverview}>
          <Text style={styles.thankYouText}>Thank you for placing your order with EventPro</Text>
          <Text style={styles.orderConfirmationText}>Your order confirmation has been Successfully cleared.</Text>

          <View 
            style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignContent: 'center', 
              backgroundColor: 'rgba(0, 0, 0, 0.3)', 
              borderRadius: 15, 
              width: '100%', 
              height: 60,
              marginTop: 10,
            }}>
              
            <TouchableOpacity
              style={[
                styles.viewReceiptButton,
                selectedButton === 'ViewReceipt' && { backgroundColor: '#000000' },
              ]}
              onPress={handleViewReceiptPress}
            >
              <Text style={[styles.viewReceiptButtonText, selectedButton === 'ViewReceipt' && { color: '#ffffff' }]}>
                View Receipt
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.rateOurAppButton,
                selectedButton === 'Reviews' && { backgroundColor: '#000000' },
              ]}
              onPress={handleRateOurAppPress}
            >
              <Text style={[styles.rateOurAppButtonText, selectedButton === 'Reviews' && { color: '#ffffff' }]}>
                Rate our app
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    orderOverview: {
      width: '80%',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 15,
    },
    thankYouText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,

    },
    orderConfirmationText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,

    },
    viewReceiptButton: {
      width: '45%',
      height: 40,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 8,
    },
    viewReceiptButtonText: {
      color: '#000000',
      fontSize: 16,
    },
    rateOurAppButton: {
      width: '45%',
      height: 40,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10,
      marginRight: 8,

    },
    rateOurAppButtonText: {
      color: '#000000',
      fontSize: 16,
    },
  });

export default SuccessfulOrderScreen;
