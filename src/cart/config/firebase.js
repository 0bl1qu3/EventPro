import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCERBRuYh_ZjGDY_mST0YZ7ezAauycxW_o",
    authDomain: "eventpro-dc6fb.firebaseapp.com",
    projectId: "eventpro-dc6fb",
    storageBucket: "eventpro-dc6fb.appspot.com",
    messagingSenderId: "984245125977",
    appId: "1:984245125977:web:27364e23edaa02c33f0248",
    measurementId: "G-THTH92VXC9"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc }