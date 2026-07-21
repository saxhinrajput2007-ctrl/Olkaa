import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

document.getElementById("logout").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
