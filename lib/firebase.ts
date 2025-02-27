// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
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
const provider = new GoogleAuthProvider();

// Sign up a new user
export async function signup(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      let message = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already in use. Try logging in or use a different email.";
          break;
        case "auth/invalid-email":
          message = "Invalid email address. Please check the format.";
          break;
        case "auth/too-many-requests":
          message = "Too many requests. Please try again later.";
          break;
        default:
          message = "An unexpected error occurred. Please try again.";
      }
      return { success: false, message: message };
    } else {
      return { success: false, message: "An unknown error occured" };
    }
  }
}

export async function login(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      let message = "";
      switch (error.code) {
        case "auth/invalid-credential":
          message = "Invalid credentials. Check email and password.";
          break;
        case "auth/too-many-requests":
          message = "Too many requests. Please try again later.";
          break;
        default:
          message = "An unexpected error occurred. Please try again.";
      }
      return { success: false, message: message };
    } else {
      return { success: false, message: "An unknown error occured" };
    }
  }
}

export async function googleLogin() {
  try {
    await signInWithPopup(auth, provider);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      let message;
      switch (error.code) {
        case "auth/popup-closed-by-user":
          message = "The login popup was closed before completing the login. Please try again.";
          break;
        case "auth/cancelled-popup-request":
          message = "The login attempt was cancelled. Please try again.";
          break;
        case "auth/invalid-credential":
          message = "Invalid Google credentials. Please try logging in again.";
          break;
        case "auth/account-exists-with-different-credential":
          message = "An account already exists with this email. Please use a different sign-in method.";
          break;
        case "auth/too-many-requests":
          message = "Too many requests. Please try again later.";
          break;
        default:
          message = "An unexpected error occurred. Please try again.";
      }
      return { success: false, message: message };
    } else {
      return { success: false, message: "An unknown error occured" };
    }
  }
}

export async function requestPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { sucess: true, message: "Password reset email sent!" };
  } catch (error) {
    let message;
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          message = "No user found with that email address.";
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
        case "auth/too-many-requests":
          message = "Too many requests. Please try again later.";
          break;
        default:
          message = "An unexpected error occurred. Please try again.";
          message = error.code;
          break;
      }
      return { success: false, message: message };
    } else {
      return { success: false, message: "An unknown error occured" };
    }
  }
}
