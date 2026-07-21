import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.getElementById("signup").onclick = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("status").innerText = "✅ Sign Up Successful!";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
    });
};

document.getElementById("login").onclick = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("status").innerText = "✅ Login Successful!";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
    });
};
