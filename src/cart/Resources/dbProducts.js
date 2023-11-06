import React,{ useEffect, useState } from 'react';
import { app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from '../config/firebase';

const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return products;
};
  
export { fetchProducts };


