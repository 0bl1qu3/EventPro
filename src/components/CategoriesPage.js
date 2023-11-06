import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartPage from './CartPage';
import Profile from './Profile';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import CartProvider from '../cart/cartContext';

import CartStack from '../cart/cartStack.js';

const Tab = createBottomTabNavigator();

const categories = [
  {
    title: 'Catering',
    image: require('./pictures/Catering_image.png'),
    screen: 'CateringPage',
  },
  {
    title: 'Games',
    image: require('./pictures/games_image.png'),
    screen: 'GamesPage',
  },
  {
    title: "DJ's",
    image: require('./pictures/dj_image.png'),
    screen: 'DJsPage',
  },
  {
    title: 'Invitation',
    image: require('./pictures/invitation_image.png'),
    screen: 'InvitationPage',
  },
  {
    title: 'Equipment',
    image: require('./pictures/equipment_image.png'),
    screen: 'EquipmentPage',
  },
  {
    title: 'BarTender',
    image: require('./pictures/bartenders_image.png'),
    screen: 'BartenderPage',
  },
];

const CategoriesPage = ({route}) => {
  const navigation = useNavigation();
  const buttonPressAnim = {}; // Store individual animated values for each button

  categories.forEach((_, index) => {
    buttonPressAnim[index] = new Animated.Value(1);
  });

  const handleCategoryPress = (screen, index) => {
    navigation.navigate(screen);
    animateButton(index);
  };

  const animateButton = (index) => {
    Animated.sequence([
      Animated.timing(buttonPressAnim[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonPressAnim[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Categories') {
            iconName = 'category';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'account';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ffb6b6b2',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Categories">
        {() => (
          <ScrollView style={styles.categoriesPage}>
            <Image style={styles.categoriesImage} source={require('./pictures/categories_image.png')} />
            <View style={styles.divWrapper}>
              <Text style={styles.textWrapper3}>CATEGORIES</Text>
            </View>

            <View style={styles.options}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCategoryPress(category.screen, index)}
                  onPressIn={() => {}}
                  onPressOut={() => {}}
                >
                  <Animated.View
                    style={[
                      styles.optionItem,
                      { transform: [{ scale: buttonPressAnim[index] }] },
                    ]}
                  >
                    <Text style={styles.optionTitle}>{category.title}</Text>
                    <Image style={styles.optionImage} source={category.image} />
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </Tab.Screen>

        <Tab.Screen name="Cart" component={CartStack} options={{headerShown: false}} />

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  categoriesPage: {
    flex: 1,
  },
  categoriesImage: {
    height: 199,
    width: '100%',
    resizeMode: 'cover',
  },

  divWrapper: {
    backgroundColor: '#ffb6b6b2',
    borderRadius: 10,
    height: 29,
    width: 281,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 210,
    left: '50%',
    marginLeft: -140,
  },

  textWrapper3: {
    color: '#000000',
    // fontFamily: 'Old Standard TT-Regular, Helvetica',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    width: '100%',
  },

  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50,
  },
  optionItem: {
    alignItems: 'center',
    margin: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 120,
    shadowColor: 'red',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  optionTitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  optionImage: {
    width: 109,
    height: 104,
    resizeMode: 'cover',
  },
});

export default CategoriesPage;
