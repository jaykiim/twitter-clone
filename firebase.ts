import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAHBuys4_5V6XumW277J1R5Ox_7iuz3Uk",
  authDomain: "next-twitter-e36ad.firebaseapp.com",
  projectId: "next-twitter-e36ad",
  storageBucket: "next-twitter-e36ad.appspot.com",
  messagingSenderId: "498272470578",
  appId: "1:498272470578:web:8ccfd3583c26f7c6b21e2b",
  measurementId: "G-K3BHXMJGFZ",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
// const analytics = getAnalytics(app);

export default app;
export { db, storage };
