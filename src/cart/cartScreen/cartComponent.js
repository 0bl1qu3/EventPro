import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import { useCart } from '../cartContext';

const CartComponent = ({ product }) => {
  
  const {MyCart, addToCart, removeFromCart, clearCart} = useCart();
  
  return(
    <View style={styles.itemComponent}>

      <Image 
        source={{uri:product.image}}
        style={{width: '10%', height: '90%', marginRight: 5, alignSelf: 'center'}}
      />
      
      <View>
        <Text style={{fontSize: 24, marginBottom: 10}}>{product.title}</Text>
        <Text style={{fontSize: 15}}>Price: R{product.price * product.quantity}</Text>
        <Text style={{fontSize: 10}}>qty/hrs: {product.quantity}</Text>
      </View>

      <TouchableOpacity style={{borderWidth: 2, right: 0, position: 'absolute', alignSelf: 'center', marginRight: 10, borderRadius: 30}}
      onPress={() => removeFromCart(product)}>
        <EvilIcons name="trash" size={32} color="red" />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    itemComponent:{
      flexDirection: 'row',
      width: '90%',
      borderWidth: 2,
      marginBottom: 10,
      padding: 10
    },
})

export default CartComponent;