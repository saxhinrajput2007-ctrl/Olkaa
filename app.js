import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// SIGN UP
document.getElementById("signup").onclick = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("status").innerText = "✅ Sign Up Successful!";
      window.location.href = "chat.html";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
    });
};

// LOGIN
document.getElementById("login").onclick = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("status").innerText = "✅ Login Successful!";
      window.location.href = "chat.html";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
    });
};
