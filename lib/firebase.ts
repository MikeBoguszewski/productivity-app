// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
const db = getFirestore(app);
const auth = getAuth(app);

// Sign up a new user
export async function signup(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Error:", error.code, error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
}

export async function login(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Error:", error.code, error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
}
