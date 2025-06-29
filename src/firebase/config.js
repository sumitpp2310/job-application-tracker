// src/firebase/config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBMdzNZyGB9tcgYdzn-laICfODJOCYvIRE",
  authDomain: "jobtracker-6f22e.firebaseapp.com",
  projectId: "jobtracker-6f22e",
  storageBucket: "jobtracker-6f22e.appspot.com", // ✅ .appspot.com hona chahiye
  messagingSenderId: "608425852021",
  appId: "1:608425852021:web:f2231045d9e6812ace8c3c"
};

export const app = initializeApp(firebaseConfig);
