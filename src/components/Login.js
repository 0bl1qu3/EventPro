import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firebase configuration

import { useCart } from '../cart/cartContext';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loginError: '', // Add an error state
    };
  }
  

  async handleLogin() {
    const { email, password } = this.state;

    try {
      // Query Firestore for the user based on the provided email
      const userQuery = query(collection(db, 'user'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // Assuming the email is unique, there should be only one result
        const userData = querySnapshot.docs[0].data();

        // Compare the entered password with the password from Firestore
        if (userData.password === password) {

          // Passwords match, navigate to the Profile screen
          this.props.navigation.navigate('CategoriesPage', { email });
        } else {
          // Password is incorrect
          this.setState({ loginError: 'Incorrect email or password.' });
        }
      } else {
        // User with the provided email doesn't exist
        this.setState({ loginError: 'User not found.' });
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      this.setState({ loginError: 'An error occurred. Please try again.' });
    }
  }

  

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>
                <Text style={styles.letter1}>L</Text>
                <Text style={styles.letter2}>o</Text>
                <Text style={styles.letter3}>g</Text>
                <Text style={styles.letter4}>i</Text>
                <Text style={styles.letter5}>n</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={styles.placeholderText1.color}
                onChangeText={(text) => this.setState({ email: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={styles.placeholderText2.color}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
              />
              {this.state.loginError !== '' && (
                <Text style={styles.errorText}>{this.state.loginError}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={() => this.handleLogin()}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.loginLink}>Don't have an account? <Text style={styles.login}>Sign Up</Text></Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('./pictures/Balloons2.jpg')}
              style={styles.backgroundImage}
            />
            <Image
              source={require('./pictures/Balloons2.jpg')}
              style={styles.backgroundImage2} // Same styles, not flipped
            />
            
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(192, 192, 192, 0.2)', // Silver transparent color
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width:"80%",
    height:"40%",
    marginLeft:"10%",
    marginTop:"40%",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  letter1: {
    color: 'lightpink',
  },
  letter2: {
    color: 'lightgreen',
  },
  letter3: {
    color: 'lightblue',
  },
  letter4: {
    color: 'lightcoral',
  },
  letter5: {
    color: 'lightpink',
  },
  inputContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: 250,
    textAlign: 'center',
  },
  placeholderText1: {
    color: 'lightpink',
  },
  placeholderText2: {
    color: 'lightgreen',
  },
  button: {
    backgroundColor: 'lightpink',
    borderRadius: 100,
    padding: 10,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  login: {
    color: 'purple',
  },
  loginLink: {
    textAlign: 'center',
    color: 'lightblue',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '60%',
  },
  backgroundImage: {
    width: '45%',
    height: 200, // Adjust the height as needed for spacing
    resizeMode: "cover",
    transform: [{ scaleX: -1 }],

  },
  backgroundImage2: {
    width: '45%',
    height: 200, // Adjust the height as needed for spacing
    resizeMode: "cover",
  },
});

export default Login;
