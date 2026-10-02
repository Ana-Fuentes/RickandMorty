import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyHHvGOqPuhkcBvV2SZ9rEwHjmB1r-XGI",
  authDomain: "permisos-1e3bb.firebaseapp.com",
  projectId: "permisos-1e3bb",
  storageBucket: "permisos-1e3bb.firebasestorage.app",
  messagingSenderId: "248083162597",
  appId: "1:248083162597:web:8bd56e4dfd951046313b0c",
  measurementId: "G-5HCEPSYJY7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);