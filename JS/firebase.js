import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDol46BKZDeH-rIR-Kof_tbyIiFikL0hQQ",
  authDomain: "mimozty-8ef5d.firebaseapp.com",
  projectId: "mimozty-8ef5d",
  storageBucket: "mimozty-8ef5d.firebasestorage.app",
  messagingSenderId: "19933846015",
  appId: "1:19933846015:web:490a5b75e5e5ece5082fca"
};

const app = initializeApp(firebaseConfig);

console.log("firebase connected");

export const db = getFirestore(app);
export { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc };