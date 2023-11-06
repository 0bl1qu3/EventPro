import React, { useEffect, useState } from 'react';
import { ImageBackground, TextInput, Image, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase'; // Import your Firebase configuration

const ViewReceipt = ({ navigation }) => {
  const [details, setDetails] = useState({}); // Initialize as an empty object

  const GetData = async () => {
    const docRef = doc(db, "reviews", "byMvmvuOubYCQQVWOoNm");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDetails(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleButtonPress = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground source={require('./pictures/background1.gif')} resizeMode="cover" style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <View style={styles.paymentScreenHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('./pictures/back-icon.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{'Receipts\n OverView'}</Text>
          <Image source={require('./pictures/receipt.gif')} style={styles.payment} />
        </View>
        <View style={styles.personalInfo}>
          <Text style={styles.headerText}>Receipt</Text>
        </View>

        <View style={styles.proceedButton}>
          <TouchableOpacity style={styles.submitButton} onPress={handleButtonPress}>
            <Text style={styles.submitButtonText}>Proceed to Home Page</Text>
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
  paymentScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
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
  headerText: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
  },
  personalInfo: {
    marginLeft: 10,
    marginTop: 10,
    width: '90%',
    height: 250,
    maxWidth: 400,
    // padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  personalInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  proceedButton: {
    marginTop: 30
  },
  submitButton: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8080FF',
    marginLeft: 30,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 
});

export default ViewReceipt;
