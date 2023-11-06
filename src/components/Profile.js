import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firebase configuration

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: '',
        surname: '',
        email: '',
        address: '', // New field
        cellNo: '',  // New field
      },
      isEditModalVisible: false, // Flag to control the Edit Profile modal
      isDeleteModalVisible: false, // Flag to control the Delete Profile modal
      editedUser: {
        name: '',
        surname: '',
        email: '',
        address: '', // New field
        cellNo: '',  // New field
      },
    };
  }

  async componentDidMount() {
    const { email } = this.props.route.params;

    try {
      // Query Firestore for the user based on the provided email
      const userQuery = query(collection(db, 'user'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // Assuming the email is unique, there should be only one result
        const userData = querySnapshot.docs[0].data();
        this.setState({
          user: {
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            address: userData.address, // New field
            cellNo: userData.cellNo,   // New field
          },
          editedUser: {
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            address: userData.address, // New field
            cellNo: userData.cellNo,   // New field
          },
        });
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  }

  editProfile = () => {
    this.setState({ isEditModalVisible: true });
  }

  saveProfileChanges = async () => {
    const { email } = this.state.user;
    const { name, surname, address, cellNo } = this.state.editedUser;

    try {
      const userQuery = query(collection(db, 'user'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0];
        await updateDoc(doc(db, 'user', userData.id), {
          name,
          surname,
          address,
          cellNo,
        });
      }

      this.setState({ isEditModalVisible: false });

      // Update the user state with the edited data
      this.setState({
        user: {
          ...this.state.user,
          name,
          surname,
          address,
          cellNo,
        },
      });
    } catch (error) {
      console.error('Error saving profile changes: ', error);
    }
  }

  cancelProfileEdit = () => {
    this.setState({ isEditModalVisible: false });
  }

  deleteProfile = () => {
    this.setState({ isDeleteModalVisible: true });
  }

  confirmDeleteProfile = async () => {
    const { email } = this.state.user;

    try {
      const userQuery = query(collection(db, 'user'), where('email', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0];
        await deleteDoc(doc(db, 'user', userData.id));
      }

      this.setState({ isDeleteModalVisible: false });

      // After deleting the user data, navigate to the login page or perform any other necessary actions.
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.error('Error deleting user data: ', error);
    }
  }

  cancelDeleteProfile = () => {
    this.setState({ isDeleteModalVisible: false });
  }

  signOut = () => {
    // Implement your sign-out logic here
    // You can use a Firebase sign-out function or your preferred method
    // After signing out, navigate to the Login page
    this.props.navigation.navigate('Login');
  }

  render() {
    const { name, surname, email, address, cellNo } = this.state.user;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            <Text style={styles.letter1}>U</Text>
            <Text style={styles.letter2}>s</Text>
            <Text style={styles.letter3}>e</Text>
            <Text style={styles.letter4}>r</Text>
            <Text style={styles.letter5}> </Text>
            <Text style={styles.letter6}>P</Text>
            <Text style={styles.letter7}>r</Text>
            <Text style={styles.letter8}>o</Text>
            <Text style={styles.letter9}>f</Text>
            <Text style={styles.letter10}>i</Text>
            <Text style={styles.letter11}>l</Text>
            <Text style={styles.letter12}>e</Text>
          </Text>
          <View style={styles.profileInfo}>
            <Text style={[styles.infoLabel, styles.pastelColor3]}>Name:</Text>
            <Text style={[styles.infoValue, styles.pastelColor1, styles.centeredText]}>{name}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.infoLabel, styles.pastelColor3]}>Surname:</Text>
            <Text style={[styles.infoValue, styles.pastelColor1, styles.centeredText]}>{surname}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.infoLabel, styles.pastelColor3]}>Email:</Text>
            <Text style={[styles.infoValue, styles.pastelColor1, styles.centeredText]}>{email}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.infoLabel, styles.pastelColor3]}>Address:</Text>
            <Text style={[styles.infoValue, styles.pastelColor1, styles.centeredText]}>{address}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.infoLabel, styles.pastelColor3]}>Cell No:</Text>
            <Text style={[styles.infoValue, styles.pastelColor1, styles.centeredText]}>{cellNo}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.editProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={this.deleteProfile}>
            <Text style={styles.buttonText}>Delete Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signoutButton} onPress={this.signOut}>
            <Text style={styles.signoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Edit Profile Modal */}
        <Modal
          visible={this.state.isEditModalVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <Text>Edit Profile</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Name"
              value={this.state.editedUser.name}
              onChangeText={(text) => this.setState({ editedUser: { ...this.state.editedUser, name: text } })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Surname"
              value={this.state.editedUser.surname}
              onChangeText={(text) => this.setState({ editedUser: { ...this.state.editedUser, surname: text } })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Address"
              value={this.state.editedUser.address}
              onChangeText={(text) => this.setState({ editedUser: { ...this.state.editedUser, address: text } })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Cell No"
              value={this.state.editedUser.cellNo}
              onChangeText={(text) => this.setState({ editedUser: { ...this.state.editedUser, cellNo: text } })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={this.saveProfileChanges}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={this.cancelProfileEdit}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Delete Profile Modal */}
        <Modal
          visible={this.state.isDeleteModalVisible}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <Text style={styles.deleteProfileText}>Confirm Delete Profile</Text>
            <Text>Are you sure you want to delete your profile?</Text>
            <TouchableOpacity style={styles.confirmDeleteButton} onPress={this.confirmDeleteProfile}>
              <Text style={styles.buttonText}>Confirm Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelDeleteButton} onPress={this.cancelDeleteProfile}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(192, 192, 192, 0.2)', // Silver transparent color
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width:"80%",
    height:"75%",
    marginLeft:"10%",
    marginTop:"2%",
    top: '8%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
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
  letter7: {
    color: 'lightgreen',
  },
  letter8: {
    color: 'lightblue',
  },
  letter9: {
    color: 'lightcoral',
  },
  letter10: {
    color: 'lightpink',
  },
  letter11: {
    color: 'lightgreen',
  },
  letter12: {
    color: 'lightblue',
  },
  profileInfo: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
  },
  infoValue: {
    fontSize: 16,
    color: 'black',
  },
  centeredText: {
    textAlign: 'center',
  },
  pastelColor1: {
    color: 'lightpink',
    textAlign: 'center',
  },
  pastelColor2: {
    color: 'lightpink',
    textAlign: 'center',
  },
  pastelColor3: {
    color: 'lightblue',
    textAlign: 'center',
  },
  signoutButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    width: 250,
    textAlign: 'center',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'lightpink',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteProfileText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmDeleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  cancelDeleteButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightpink',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  signoutButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Profile;


