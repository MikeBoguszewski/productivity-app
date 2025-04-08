// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc, collection, where, query, onSnapshot, deleteDoc, increment, orderBy, limit, getDocs, getDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updateProfile, signOut } from "firebase/auth";
import { Task } from "@/components/tasks/columns";
import { ChartData } from "@/components/dashboard/focus-chart";
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
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign up a new user
export async function signup(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const displayName = email.split("@")[0];
    await updateProfile(user, {
      displayName: displayName,
    });
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
      return { success: false, message: "An unknown error occured." };
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
      return { success: false, message: "An unknown error occured." };
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
      return { success: false, message: "An unknown error occured." };
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
      return { success: false, message: "An unknown error occured." };
    }
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { success: true, message: "Logged out successfully." };
  } catch (error) {
    return { success: false, message: "An unknown error occurred." };
  }
}

export async function addTask(task: string) {
  const user = auth.currentUser;
  if (!user) {
    return { success: false, message: "You must be logged in to add a task." };
  }
  const userId = user.uid;
  try {
    const docRef = collection(db, "tasks");
    const newDocRef = await doc(docRef);
    await setDoc(newDocRef, { task: task, userId: userId, createdAt: serverTimestamp() });
    return { success: true };
  } catch {
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}

export function listenForTasks(callback: (tasks: Task[]) => void) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, unsubscribe: () => {} };
    }
    const userId = user.uid;
    const docRef = collection(db, "tasks");
    const q = query(docRef, where("userId", "==", userId), orderBy("createdAt", "desc"));

    let tasks: Task[] = [];
    const unsubscribe = onSnapshot(q, (snapshot) => {
      tasks = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          task: data.task,
        };
      });
      callback(tasks);
    });

    return { success: true, unsubscribe: unsubscribe };
  } catch (error) {
    return { success: false, unsubscribe: () => {} };
  }
}

export async function deleteTasks(ids: string[]) {
  try {
    await Promise.all(
      ids.map(async (id) => {
        await deleteDoc(doc(db, "tasks", id));
      })
    );
    return { success: true };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}

export async function incrementFocusTime() {
  const user = auth.currentUser;
  if (!user) {
    return { success: false, message: "You must be logged in to update your focus time." };
  }
  const userId = user.uid;
  try {
    const statsRef = collection(db, "stats");
    const statsDoc = doc(statsRef, userId);
    const dailyFocusRef = collection(statsDoc, "dailyFocus");
    const dailyFocusDoc = doc(dailyFocusRef, new Date().toISOString().split("T")[0]);
    await setDoc(statsDoc, { totalMinutesFocused: increment(1) }, { merge: true });
    await setDoc(dailyFocusDoc, { minutesFocused: increment(1) }, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}

export async function incrementTasksCompleted(taskCount: number) {
  const user = auth.currentUser;
  if (!user) {
    return { success: false, message: "You must be logged in to update your tasks completed." };
  }
  const userId = user.uid;
  try {
    const statsRef = collection(db, "stats");
    const statsDoc = doc(statsRef, userId);
    await setDoc(statsDoc, { totalTasksCompleted: increment(taskCount) }, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}

export async function fetchDailyStats(): Promise<ChartData[]> {
  const user = auth.currentUser;
  if (!user) {
    return [];
  }
  const userId = user.uid;
  try {
    const statsRef = collection(db, "stats");
    const statsDoc = doc(statsRef, userId);
    const dailyFocusRef = collection(statsDoc, "dailyFocus");
    const dailyStats = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const day = date.toISOString().split("T")[0];
      const docRef = doc(dailyFocusRef, day);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        dailyStats.push({
          date: day,
          minutesFocused: data.minutesFocused,
        });
      } else {
        dailyStats.push({
          date: day,
          minutesFocused: 0,
        });
      }
    }
    return dailyStats;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchTotalFocusTime(): Promise<number | null> {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  const userId = user.uid;
  try {
    const statsRef = collection(db, "stats");
    const statsDoc = doc(statsRef, userId);
    const docSnap = await getDoc(statsDoc);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.totalMinutesFocused;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchTasksCompleted(): Promise<number | null> {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  const userId = user.uid;
  try {
    const statsRef = collection(db, "stats");
    const statsDoc = doc(statsRef, userId);
    const docSnap = await getDoc(statsDoc);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.totalTasksCompleted;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchRecentTasks(): Promise<Task[]> {
  const user = auth.currentUser;
  if (!user) {
    return [];
  }
  const userId = user.uid;
  try {
    const docRef = collection(db, "tasks");
    const q = query(docRef, where("userId", "==", userId), limit(5), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const tasks = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        task: data.task,
      };
    });
    return tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
}
