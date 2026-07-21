import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// SIGNUP
document.getElementById("signup").addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: email,
      name: email.split("@")[0],
      photo: "https://i.pravatar.cc/150?u=" + userCredential.user.uid
    });

    alert("Signup Successful");
    window.location.href = "chat.html";

  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }

});

// LOGIN
document.getElementById("login").addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login Successful");
    window.location.href = "chat.html";

  } catch (error) {
    document.getElementById("status").innerText = error.message;
  }

});
