import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from './src/components/PaymentScreen';
import SuccessfulOrderScreen from './src/components/SuccessfulOrderScreen';
import OrderDetailsScreen from './src/components/OrderDetailsScreen';
import Reviews from './src/components/Reviews';
import ReviewList from './src/components/ReviewsList';
import ViewReceipt from './src/components/ViewReceipt';
import Profile from './src/components/Profile';
import SignUp from './src/components/SignUp';
import SplashScreen from './src/components/Splash';
import Login from './src/components/Login';
import Boarding1 from './src/components/Boarding1';
import Boarding2 from './src/components/Boarding2';
import CategoriesPage from './src/components/CategoriesPage';
import GamesPage from './src/components/GamesPage';
import DJsPage from './src/components/DJsPage';
import InvitationPage from './src/components/InvitationPage';
import EquipmentPage from './src/components/EquipmentPage';
import BartenderPage from './src/components/BartenderPage';
import CateringPage from './src/components/CateringPage';
import CartPage from './src/components/CartPage';
import CateringDetails from './src/components/CateringDetails';

import CartProvider from './src/cart/cartContext';

import CartStack from './src/cart/cartStack.js';

const Stack = createStackNavigator();

const App = () => { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Payment" component={PaymentScreen} options={{headerShown: false}} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{headerShown: false}} />
        <Stack.Screen name="SuccessfulOrder" component={SuccessfulOrderScreen} options={{headerShown: false}} />
        <Stack.Screen name="ViewReceipt" component={ViewReceipt} options={{headerShown: false}} />
        <Stack.Screen name="Reviews" component={Reviews} options={{headerShown: false}} />
        <Stack.Screen name="ReviewList" component={ReviewList} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Boarding1" component={Boarding1} options={{headerShown: false}} />
        <Stack.Screen name="Boarding2" component={Boarding2} options={{headerShown: false}} />
        <Stack.Screen name="CategoriesPage" component={CategoriesPage} options={{ headerShown: false }} />
        <Stack.Screen name="GamesPage" component={GamesPage} options={{ headerShown: false }} />
        <Stack.Screen name="CateringPage" component={CateringPage} options={{ headerShown: false }} />
        <Stack.Screen name="DJsPage" component={DJsPage} options={{ headerShown: false }} />
        <Stack.Screen name="EquipmentPage" component={EquipmentPage} options={{ headerShown: false }} />
        <Stack.Screen name="InvitationPage" component={InvitationPage} options={{ headerShown: false }} />
        <Stack.Screen name="BartenderPage" component={BartenderPage} options={{ headerShown: false }} />
        <Stack.Screen name="CartPage" component={CartPage} options={{ headerShown: false }} />
        <Stack.Screen name="CateringDetails" component={CateringDetails} options={{ headerShown: false }} />

      </Stack.Navigator>
      {/* <BottomTabNavigator/> */}
    </NavigationContainer>
  );
};

export default App;
