import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from '../config/firebase';

import { useCart } from '../cartContext';

import { fetchProducts } from '../Resources/dbProducts';

import { EvilIcons } from '@expo/vector-icons';

const CartComponent = ({ product }) => {

  const {MyCart, addToCart, removeFromCart, clearCart} = useCart();
  
  return(
    <View style={styles.itemComponent}>

      <Image 
        source={{uri:product.image}}
        style={{width: '5%', height: '90%', marginRight: 5, alignSelf: 'center'}}
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

const TestCart = () => {

  const [allProducts, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    fetchData();
  }, []);

    const {MyCart, addToCart, removeFromCart, clearCart} = useCart();

    let total = 0

    {MyCart.map((item) => (
      total += (parseInt(item.price) * item.quantity)
    ))}

    console.log(allProducts);

    const handleAddToCart = async () => {
      const mainRef = doc(db, 'users', 'uGWZyrOBofoZbLD6NPfV');

      const res = await updateDoc(mainRef, { cart: MyCart });

      clearCart();

    }


    return(
        <View style={styles.screen}>

          <Text style={{fontSize: 24, marginBottom: 20}}>Test Cart Screen</Text>

          {MyCart.map((item) => (
            <CartComponent product={item} />
          ))}

          <Text style={{alignSelf: 'flex-start', paddingLeft: 25, fontSize: 24}}>Total: R{total}</Text>
          
          <TouchableOpacity style={{borderWidth: 2, padding: 10, textAlign: 'center'}}
          onPress={() => handleAddToCart()}
          >
            <Text>Checkout</Text>
          </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    itemComponent: {
      width: '90%',
      borderWidth: 2,
      marginBottom: 10,
      flexDirection: 'row',
      padding: 10
    }
})

export default TestCart;