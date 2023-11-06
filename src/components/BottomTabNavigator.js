import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import CategoriesPage from './CategoriesPage';
import CartPage from './CartPage';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
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
      <Tab.Screen name="Categories" component={CategoriesPage} />
      <Tab.Screen name="Cart" component={CartPage} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
