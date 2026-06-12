import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ضع نفس apiKey",
  authDomain: "mimozty-8ef5d.firebaseapp.com",
  projectId: "mimozty-8ef5d",
  storageBucket: "mimozty-8ef5d.firebasestorage.app",
  messagingSenderId: "19933846015",
  appId: "1:19933846015:web:490a5b75e5e5ece5082fca"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export { collection, addDoc, getDocs };