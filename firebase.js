import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKlI4lNpFWv9c09aro_QGw6oM7nnLz208",
  authDomain: "olkaa-e2804.firebaseapp.com",
  projectId: "olkaa-e2804",
  storageBucket: "olkaa-e2804.firebasestorage.app",
  messagingSenderId: "333255014176",
  appId: "1:333255014176:web:f876db7d113eeb749c4945",
  measurementId: "G-NWW02DCCY6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);
 export { auth, db };
