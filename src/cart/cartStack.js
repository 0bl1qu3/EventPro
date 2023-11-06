import { createStackNavigator } from '@react-navigation/stack';

import TopTab from './topTabs/TopTabs';
import CartScreen from './cartScreen/cartScreen';

import CartProvider from '../cart/cartContext';

const MyStack = createStackNavigator();

const Cart = () => {
    return (
        <MyStack.Navigator>
            <MyStack.Screen name='Browse' component={TopTab} />
            <MyStack.Screen name='Cart' component={CartScreen}/>
        </MyStack.Navigator>
    );
}

const CartStack = () => {
    return (
        <CartProvider>
            <Cart />
        </CartProvider>
    )
}

export default CartStack;