import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useCart } from '../cartContext';

const ProductCard = ({ product }) => {

  const { MyCart, addToCart, removeFromCart } = useCart();


  const [quantity, setQuantity] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const [addCartPressed, setAddCartPressed] = useState(false);

  const handleAddToCart = () => {
    addToCart({...product, quantity: quantity});
    setAddCartPressed(!addCartPressed);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
    setAddCartPressed(!addCartPressed);
  }

  const increaseQuantity = () => setQuantity(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => setIsPressed(!isPressed)}>

      {isPressed ? (
        <Text style={styles.productDescription}>{product.description}</Text>
      ) : (
        <>
          <Image
            source={{uri:product.image}}
            style={styles.productImage}
          />
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>R {product.price}</Text>

          <View style={styles.quantityContainer}>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => decreaseQuantity()}>
                <AntDesign name="minuscircleo" size={34} color="black" />
              </TouchableOpacity>

              <TextInput
                style={styles.quantityInput}
                value={quantity.toString()}
                onChangeText={(text) => setQuantity(parseInt(text) || 1)}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => increaseQuantity()}>
                <AntDesign name="pluscircleo" size={34} color="black" />
              </TouchableOpacity>
            </View>

            {addCartPressed ? (
              <TouchableOpacity
                onPress={()=> handleRemoveFromCart()}
                style={styles.removeFromCartButton}>
                <Text
                  style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>
                  Remove from Cart
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handleAddToCart()}
                style={styles.addToCartButton}>
                <Text
                  style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '50%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 18,
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityInput: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    width: '80%',
  },
  removeFromCartButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '95%',
  },
  productDescription: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default ProductCard;