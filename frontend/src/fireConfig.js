import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeS-n1ueVJpxHX_Afyc4bQbdwyC1dKU0g",
  authDomain: "nc-ecomerce.firebaseapp.com",
  projectId: "nc-ecomerce",
  storageBucket: "nc-ecomerce.appspot.com",
  messagingSenderId: "667554248810",
  appId: "1:667554248810:web:a323ab390a757d414c3213",
  measurementId: "G-FQTMFKG6F6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

export default fireDB;
