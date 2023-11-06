import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProductScreen from './ProductsScreen';
import ServicesScreen from './ServicesScreen';

import CartProvider from '../cartContext';

const MyTopTabs = createMaterialTopTabNavigator();

const TopTab = () => {
  return(
    
    <MyTopTabs.Navigator 
    >
      <MyTopTabs.Screen name='Products Screen' component={ProductScreen} />
      <MyTopTabs.Screen name='Services Screen' component={ServicesScreen} />
    </MyTopTabs.Navigator>
  )
}

export default TopTab;