


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBcIrj8KG4e3SlNAxLDlujUazqKSZDFWDk",
  authDomain: "moviehub-86476.firebaseapp.com",
  projectId: "moviehub-86476",
  storageBucket: "moviehub-86476.appspot.com",
  messagingSenderId: "506672364217",
  appId: "1:506672364217:web:26dd4af5e4b58811a3b968",
  measurementId: "G-470N7N2B4B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
