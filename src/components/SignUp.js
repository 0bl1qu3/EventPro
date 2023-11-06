import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "./firebase"; // Import your Firebase configuration

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      address: '', // New field
      cellNo: '',  // New field
      passwordWarning: '',
      emailWarning: '',
      nameWarning: '',
      surnameWarning: '',
      addressWarning: '', // New field
      cellNoWarning: '',  // New field
    };
  }

  // Validation function for email format
  isEmailValid(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  handleSignUp = async () => {
    this.setState({
      passwordWarning: '',
      emailWarning: '',
      nameWarning: '',
      surnameWarning: '',
      addressWarning: '',
      cellNoWarning: '',
    });

    const { name, surname, email, password, address, cellNo } = this.state;

    if (!name) {
      this.setState({ nameWarning: 'Name is required.' });
      return;
    }

    if (!surname) {
      this.setState({ surnameWarning: 'Surname is required.' });
      return;
    }

    if (!address) {
      this.setState({ addressWarning: 'Address is required.' });
      return;
    }

    if (!cellNo) {
      this.setState({ cellNoWarning: 'Cell No is required.' });
      return;
    }

    if (password.length < 8) {
      this.setState({ passwordWarning: 'Password should be at least 8 characters long.' });
      return;
    }

    if (!this.isEmailValid(email)) {
      this.setState({ emailWarning: 'Please enter a valid email address.' });
      return;
    }

    const user = {
      name,
      surname,
      email,
      password,
      address,
      cellNo,
    };

    try {
      const userRef = await addDoc(collection(db, 'user'), user);
      console.log('User added with ID: ', userRef.id);
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>
              <Text style={styles.letter1}>S</Text>
              <Text style={styles.letter2}>i</Text>
              <Text style={styles.letter3}>g</Text>
              <Text style={styles.letter4}>n</Text>
              <Text style={styles.letter5}>U</Text>
              <Text style={styles.letter6}>p</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={styles.placeholderText1.color}
              onChangeText={(text) => this.setState({ name: text })}
            />
            {this.state.nameWarning !== '' && (
              <Text style={styles.warningText}>{this.state.nameWarning}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Surname"
              placeholderTextColor={styles.placeholderText2.color}
              onChangeText={(text) => this.setState({ surname: text })}
            />
            {this.state.surnameWarning !== '' && (
              <Text style={styles.warningText}>{this.state.surnameWarning}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor={styles.placeholderText5.color}
              onChangeText={(text) => this.setState({ address: text })}
            />
            {this.state.addressWarning !== '' && (
              <Text style={styles.warningText}>{this.state.addressWarning}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Cell No"
              placeholderTextColor={styles.placeholderText6.color}
              onChangeText={(text) => this.setState({ cellNo: text })}
            />
            {this.state.cellNoWarning !== '' && (
              <Text style={styles.warningText}>{this.state.cellNoWarning}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={styles.placeholderText3.color}
              onChangeText={(text) => this.setState({ email: text })}
            />
            {this.state.emailWarning !== '' && (
              <Text style={styles.warningText}>{this.state.emailWarning}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={styles.placeholderText4.color}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
            />
            {this.state.passwordWarning !== '' && (
              <Text style={styles.warningText}>{this.state.passwordWarning}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Already have an account? <Text style={styles.login}>Login</Text></Text>
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
            style={styles.backgroundImage2}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(192, 192, 192, 0.2)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: "80%",
    height: "75%",
    marginLeft: "10%",
    marginTop: "2%",
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
  letter6: {
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
  button
: {
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
  placeholderText1: {
    color: 'lightpink',
  },
  placeholderText2: {
    color: 'lightblue',
  },
  placeholderText3: {
    color: 'lightgreen',
  },
  placeholderText4: {
    color: 'lightcoral',
  },
  placeholderText5: {
    color: 'lightcoral', // New field
  },
  placeholderText6: {
    color: 'lightgreen', // New field
  },
  warningText: {
    color: 'red',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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

export default SignUp;
