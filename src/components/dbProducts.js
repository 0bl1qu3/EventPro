import React,{ useEffect, useState } from 'react';
import { app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from './config/firebase';

const [products, setProducts] = useState([]);

const getProducts = async() => {

    const querySnapshot = await getDocs(collection(db, "products"));

    setProducts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

};

export { products }