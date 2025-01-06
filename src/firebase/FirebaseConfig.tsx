// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA4eIN3R00Yl_-D0pRvbFhTFkd-Pu8znRY',
  authDomain: 'restourant-management.firebaseapp.com',
  projectId: 'restourant-management',
  storageBucket: 'restourant-management.firebasestorage.app',
  messagingSenderId: '577668575123',
  appId: '1:577668575123:web:2545c2b87b80d0a6f78266',
  measurementId: 'G-CHCREPZG0M',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
