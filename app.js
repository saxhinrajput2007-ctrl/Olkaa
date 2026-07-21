import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// SIGN UP
document.getElementById("signup").onclick = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: email
    });

    alert("Signup Success");
    window.location.href = "chat.html";

  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
};

// LOGIN
document.getElementById("login").onclick = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);

    alert("Login Success");
    window.location.href = "chat.html";

  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }
};
