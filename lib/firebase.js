// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQITx3VyIr-H9mYDA_SJNG1sbVyd6i7yA",
  authDomain: "productivityapp-f2a7c.firebaseapp.com",
  projectId: "productivityapp-f2a7c",
  storageBucket: "productivityapp-f2a7c.firebasestorage.app",
  messagingSenderId: "754523731628",
  appId: "1:754523731628:web:4f8c41b8e0ce94e5141109",
  measurementId: "G-4LV4MB253C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
