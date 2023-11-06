import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getFirestore} from "firebase/firestore" 

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
export const analytics = getAnalytics(app);

export const db = getFirestore(app); 