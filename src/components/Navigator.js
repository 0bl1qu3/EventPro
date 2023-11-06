import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartPage from '../screens/CartPage';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        // Configure your tab bar options here, if needed
        // For example, you can set the style and other options
      }}
    >
      <Tab.Screen
        name="Cart"
        component={CartPage}
      />
    </Tab.Navigator>
  );
};

export default Navigator;



