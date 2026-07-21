import { auth, db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const usersDiv = document.getElementById("users");

// Login check
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  loadUsers(user.uid);

});

// Load users
async function loadUsers(myUid) {

  usersDiv.innerHTML = "";

  const snapshot = await getDocs(collection(db, "users"));

  snapshot.forEach((doc) => {

    const data = doc.data();

    if (data.uid !== myUid) {

      const div = document.createElement("div");

      div.className = "user";

      div.innerHTML = data.email;

      div.onclick = () => {

        alert("Chat with: " + data.email);

      };

      usersDiv.appendChild(div);

    }

  });

}

// Logout
document.getElementById("logout").onclick = async () => {

  await signOut(auth);

  window.location.href = "index.html";

};
