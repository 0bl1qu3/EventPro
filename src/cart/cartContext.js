import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
}

const CartProvider = ({ children }) => {
  const [MyCart, setMyCart] = useState([]);
  const [userID, setUserID] = useState('empty');


  const addToCart = (item) => {
    const newItem = { title: item.title, price: item.price, quantity: item.quantity, image: item.image };
    setMyCart([...MyCart, newItem]);
    console.log(MyCart);
  };

  const removeFromCart = (item) => {
    setMyCart(MyCart.filter((product) => product.title !== item.title));
  };

  const clearCart = () => {
    setMyCart([]);
  }

  const setCurrentUser = (item) => {
    setUserID(item);
    console.log(userID);
  }

  return (
    <CartContext.Provider value={{ MyCart, userID, addToCart, removeFromCart, clearCart, setCurrentUser }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;