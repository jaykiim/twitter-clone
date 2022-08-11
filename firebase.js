import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpEUHI1eQMipiaO1x0ZdvOguuFggZ_eM8",
  authDomain: "next-twitter-clone-793fc.firebaseapp.com",
  projectId: "next-twitter-clone-793fc",
  storageBucket: "next-twitter-clone-793fc.appspot.com",
  messagingSenderId: "656725526066",
  appId: "1:656725526066:web:b53584b6a55fd495f95e2b",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
