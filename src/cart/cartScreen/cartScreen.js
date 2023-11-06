import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { useCart } from '../cartContext';

import { app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from '../config/firebase';

import CartComponent from './cartComponent';

const CartScreen = ({ navigation }) => {

    const {MyCart, addToCart, removeFromCart, clearCart} = useCart();

    let total = 0

    {MyCart.map((item) => (
      total += (parseInt(item.price) * item.quantity)
    ))}

    const handleAddToCart = async () => {
      const userRef = doc(db, 'user', 'bVDUqecY3usfCproIbFE');

      const res = await updateDoc(userRef, { cart: MyCart });

      clearCart();

      navigation.navigate('OrderDetails');

    }

    return(
        <View style={styles.screen}>

            <Text style={{fontSize: 24, marginBottom: 20}}>Cart Screen</Text>

            {MyCart.map((item) => (
            <CartComponent product={item} />
            ))}

            <Text style={{alignSelf: 'flex-start', paddingLeft: 25, fontSize: 24}}>Total: R{total}</Text>
          
            <TouchableOpacity style={styles.checkOutButton}
                onPress={() => handleAddToCart()}
                >
                <Text>Checkout</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    checkOutButton: {
        borderRadius: 7,
        padding: 10,
        textAlign: 'center',
        width: '90%',
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'green'
    }
})

export default CartScreen;