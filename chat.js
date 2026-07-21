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
const chatHeader = document.getElementById("chatHeader");

// Login Check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  loadUsers(user.uid);
});

// Load Users
async function loadUsers(myUid) {

  usersDiv.innerHTML = "";

  const snapshot = await getDocs(collection(db, "users"));

  snapshot.forEach((docSnap) => {

    const data = docSnap.data();

    if (data.uid !== myUid) {

      const div = document.createElement("div");
      div.className = "user";

      div.innerHTML = `
        <img src="${data.photo}" width="45" height="45"
        style="border-radius:50%;margin-right:10px;vertical-align:middle;">
        <span>${data.name}</span>
      `;

      div.onclick = () => {
        chatHeader.innerText = data.name;
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
