import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import Data from '../Resources/productData.js';
import ProductCard from './ProductComponent';

import { useCart } from '../cartContext';

import { fetchProducts } from '../Resources/dbProducts.js';

const ProductScreen = ({ navigation }) => {

    const [allProducts, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const products = await fetchProducts();
        setProducts(products);
      };
  
      fetchData();
    }, []);

    const { MyCart, addToCart, removeFromCart } = useCart();

    let total = 0;

    {MyCart.map((item) => (
      total += (parseInt(item.price) * item.quantity)
    ))}

    return(
            <View style={styles.screen}>

                <View style={styles.headerView}>
                    <Text style={{fontSize: 24}}>All Products</Text>
                </View>

                <FlatList 
                data={allProducts}
                keyExtractor={product => product.id}
                renderItem={({item}) => (<ProductCard product={item} />)}
                numColumns={2}
                style={styles.productList}
                />

                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.cartButton}
                    onPress={()=>navigation.navigate('Cart')}>
                        <Text style={{fontSize: 20}}>Go to Cart</Text>
                        {total != 0 && <Text style={{fontWeight: 'bold'}}>R {total}</Text>}
                    </TouchableOpacity>
                </View>

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
    headerView: {
        height: 60,
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerView: {
        height: 80,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
    },
    cartButton: {
        padding: 5,
        borderRadius: 7,
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    }
})

export default ProductScreen;