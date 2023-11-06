import React from 'react';
import { View, Text, FlatList,TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ReviewList = ({ route }) => {

  const navigation = useNavigation();

  const { userReview } = route.params;

  return (
    <ImageBackground source={require('./pictures/background1.gif')} resizeMode="cover" style={styles.backgroundImage}>
        <ScrollView style={styles.container}>
            <View style={styles.paymentScreenHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={require('./pictures/back-icon.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{'All the\nReviews'}</Text>
            <Image source={require('./pictures/review.jpg')} style={styles.payment} />
            </View>
            <ScrollView>
                <View style={styles.personalInfo}>
                    <Text style={styles.header}>Review Lists</Text>
                    {userReview && (
                        <View style={styles.reviewItem}>
                        <Text style={styles.reviewRating}>Rating: {userReview.rating}</Text>
                        <Text style={styles.reviewText}>{userReview.review}</Text>
                        </View>
                    )}
                    
                </View>
                
            </ScrollView>         
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
        marginTop: 50,
        width: '100%',
        height: 300,
        maxWidth: 400,
        // padding: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      reviewInput: {
        height: 150,
        width: '90%',
        borderColor: '#ffffff',
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    
      },
      submitButton: {
        backgroundColor: '#8080FF',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        marginTop: 50,
        marginLeft: 25,
        
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
  reviewItem: {
    marginVertical: 10,
  },
  reviewRating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 16,
  },
});

export default ReviewList;
