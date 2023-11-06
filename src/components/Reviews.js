import React, { useState } from 'react';
import {
  Image,
  View,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import StarRating from 'react-native-star-rating';

const ReviewApp = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviewsList, setReviewsList] = useState([]);

  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleSubmit = () => {
    if (rating > 0 || review.trim() !== '') {
      const newReview = {
        id: Date.now().toString(),
        rating: rating,
        review: review,
      };
      setReviewsList([...reviewsList, newReview]);
      // Clear the review input and reset the rating
      setReview('');
      setRating(0);
      navigation.navigate('ReviewList', { userReview: newReview, reviewsList: [...reviewsList, newReview] });
    }
  };

  return (
    <ImageBackground source={require('./pictures/background1.gif')} resizeMode="cover" style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <View style={styles.paymentScreenHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('./pictures/back-icon.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{'Review\n Our App'}</Text>
          <Image source={require('./pictures/review.jpg')} style={styles.payment} />
        </View>
        <View style={styles.personalInfo}>
          <Text style={styles.header}>Write a Review</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(rating) => handleRating(rating)}
            starSize={40}
            fullStarColor={'#FFD700'}
          />
          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review..."
            value={review}
            onChangeText={(text) => setReview(text)}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    marginLeft: 5,
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
});

export default ReviewApp;
