import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const InvitationPage = () => {
  const navigation = useNavigation();

  const handleDesignOption1Click = () => {
    navigation.navigate("FormScreen", { designOption: 1 });
  };

  const handleDesignOption2Click = () => {
    navigation.navigate("FormScreen", { designOption: 2 });
  };

  const handleHomeIconPress = () => {
    navigation.navigate("CategoriesPage");
  };


  return (
    <Tab.Navigator>
      <Tab.Screen name="Invitation" component={() => (
        <ScrollView style={styles.container}>
          <ImageBackground
            source={require('./pictures/design_background.png')}
            style={styles.designPage}
          >
            <View style={styles.overlap}>
              <View style={styles.firstPart}>
                <TouchableOpacity onPress={handleHomeIconPress}>
                <Ionicons name="home" size={30} color='#001F3F' />
                </TouchableOpacity>
                <View style={styles.separator} />
                <Text style={styles.textWrapper1}>Invitation</Text>
              </View>
              <View style={styles.divWrapper}>
              <Text style={styles.textWrapper2}>Select a Design Template</Text> 
              </View>            
              <TouchableOpacity onPress={handleDesignOption1Click}>
            <Image
              source={require('./pictures/design_option1.png')}
              style={styles.designOption1}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDesignOption2Click}>
            <Image
              source={require('./pictures/design_option2.png')}
              style={styles.designOption2}
            />
          </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      )} />
      <Tab.Screen name="Profile" component={UserProfile} />
      <Tab.Screen name="Cart" component={CartPage} />
    </Tab.Navigator>
  );
};

const UserProfile = () => {
  // Profile screen content
};

const CartPage = () => {
  // Cart screen content
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  designPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlap: {
    backgroundColor: '#ffffff80',
    height: 844,
    width: '100%',
  },
  firstPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    height: "100%", // Adjust the height as needed
    width: 1, // Adjust the width as needed
    backgroundColor: "black",
    marginHorizontal: 10, // Adjust the margin as needed
  },
  textWrapper1: {
    fontWeight: '700',
    fontSize: 36,
    fontFamily: 'Poppins',
    color: '#FF4A60',
    marginLeft: 10, // Adjust the margin as needed
  },

divWrapper:{
  backgroundColor:'white',
  padding: 10,
  margin: 15,
  borderRadius: 5,
  borderColor: 'black',
  borderWidth: 2,

},

textWrapper2: {
  fontWeight: '400',
  fontSize: 20,
  fontFamily: 'Poppins',
  color: '#000000',
  textAlign: 'center',
},

  designOption: {
    height: 196,
    width: 359,
    marginBottom: 16,
    padding: 5,
    margin: 10,
    
  },
  designOption2: {
    height: 204,
    width: 359,
    marginBottom: 16,
    padding: 5,
    margin: 10,
    
  },
});

export default InvitationPage;
