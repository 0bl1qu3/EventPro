import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firebase configuration

const PaymentScreen = ({ navigation }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');
  const [cardholderName, setCardholderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [errors, setErrors] = useState({
    cardholderName: '',
    accountNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePaymentMethodChange = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handleCardholderNameChange = (text) => {
    setCardholderName(text);
    setErrors((prevErrors) => ({ ...prevErrors, cardholderName: '' }));
  };

  const handlePayButtonPress = () => {
    let formValid = true;
    const newErrors = {};

    if (!cardholderName) {
      newErrors.cardholderName = 'Cardholder Name is required';
      formValid = false;
    }

    if (!accountNumber ) {
      newErrors.accountNumber = 'Account Number is required';
      formValid = false;
    }

    if (!expiryDate) {
      newErrors.expiryDate = 'Enter the expiry date';
      formValid = false;
    }

    if (!cvv) {
      newErrors.cvv = 'Enter the CVV';
      formValid = false;
    }

    if (formValid) {
      navigation.navigate('SuccessfulOrder')
      // Alert.alert('Payment Success', 'Payment processed successfully!', [
      //   {
      //     text: 'OK',
      //     onPress: () => navigation.navigate('SuccessfulOrder'),
      //   },
      // ]);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <ImageBackground source={require('./pictures/background1.gif')} resizeMode="cover" style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <View style={styles.paymentScreenHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('./pictures/back-icon.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.paymentScreenHeaderText}>Payment</Text>
          <Image source={require('./pictures/payment.png')} style={styles.payment} />
        </View>
        <View style={styles.paymentScreenBody}>
          <View style={styles.paymentMethodSection}>
            <TouchableOpacity style={styles.radio} onPress={() => handlePaymentMethodChange('visa')}>
              {selectedPaymentMethod === 'visa' && <View style={styles.radioDot} />}
            </TouchableOpacity>
            <Image source={require('./pictures/visa-icon.png')} style={styles.paymentMethodImage} />
            <Text style={styles.paymentMethodText}>Visa</Text>
          
            <TouchableOpacity style={styles.radio} onPress={() => handlePaymentMethodChange('mastercard')}>
              {selectedPaymentMethod === 'mastercard' && <View style={styles.radioDot} />}
            </TouchableOpacity>
            <Image source={require('./pictures/mastercard-icon.png')} style={styles.paymentMethodImage} />
            <Text style={styles.paymentMethodText}>Mastercard</Text>
          </View>
          <View style={styles.paymentDetailsSection}>
            <View style={styles.row}>
              <Image source={require('./pictures/cardholder.jpg')} style={styles.icon} />
              <Text style={styles.paymentDetailsLabel}>Cardholder Name</Text>
            </View>
            <TextInput
              style={styles.paymentDetailsInput}
              placeholder=""
              value={cardholderName}
              onChangeText={handleCardholderNameChange}
            />
            <Text style={styles.errorText}>{errors.cardholderName}</Text>
          </View>
          <View style={styles.paymentDetailsSection}>
            <View style={styles.row}>
              <Image source={require('./pictures/card.jpg')} style={styles.icon} />
              <Text style={styles.paymentDetailsLabel}>Card number:</Text>
            </View>
            <TextInput
              style={styles.paymentDetailsInput}
              placeholder="**** **** **** ****"
              keyboardType="numeric"
              maxLength={16}
              value={accountNumber}
              onChangeText={(text) => setAccountNumber(text)}
            />
            <Text style={styles.errorText}>{errors.accountNumber}</Text>
          </View>
          <View style={styles.expiryCvvContainer}>
            <View style={styles.expiryCvvInput}>
              <Text style={styles.paymentDetailsLabel}>Expiry date:</Text>
              <TextInput
                style={styles.paymentDetailsInput}
                placeholder="MM/YY"
                keyboardType="numeric"

                maxLength={5}
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text)}
              />
              <Text style={styles.errorText}>{errors.expiryDate}</Text>
            </View>
            <View style={styles.expiryCvvInput}>
              <Text style={styles.paymentDetailsLabel}>Security code:</Text>
              <TextInput
                style={styles.paymentDetailsInput}
                placeholder="CVV"
                keyboardType="numeric"
                maxLength={3}
                value={cvv}
                onChangeText={(text) => setCVV(text)}
              />
              <Text style={styles.errorText}>{errors.cvv}</Text>
            </View>
          </View>
        </View>
        <View style={styles.payButton}>
          <TouchableOpacity onPress={handlePayButtonPress}>
            <Text style={styles.payButtonText}>Confirm & Pay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  paymentScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    top: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
  },
  payment: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  paymentScreenHeaderText: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
  },
  paymentScreenBody: {
    padding: 15,
    top: '8%',
  },
  paymentMethodSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  paymentMethodImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  paymentDetailsSection: {
    marginBottom: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 20,
    marginLeft: 30,
    marginRight: 15,
    marginBottom: 10,

  },
  paymentDetailsLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  paymentDetailsInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
  },
  expiryCvvContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryCvvInput: {
    flex: 1,
    margin: 10,
    marginBottom: 8,
  },
  payButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#8080FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginTop: 40,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;

