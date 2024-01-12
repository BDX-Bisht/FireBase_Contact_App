import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD45y-iEfT4hCZsYUXkZfH0y0jEYgkvFzo",
  authDomain: "vite-contact-app-1eebf.firebaseapp.com",
  projectId: "vite-contact-app-1eebf",
  storageBucket: "vite-contact-app-1eebf.appspot.com",
  messagingSenderId: "901674366271",
  appId: "1:901674366271:web:eba476d667aafc553b4f8a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
