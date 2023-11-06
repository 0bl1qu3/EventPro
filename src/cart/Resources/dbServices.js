import React,{ useEffect, useState } from 'react';
import { app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc } from '../config/firebase';

const fetchServices = async () => {
    const querySnapshot = await getDocs(collection(db, "services"));
    const services = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return services;
};
  
export { fetchServices }