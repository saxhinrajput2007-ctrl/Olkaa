import { auth, db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const usersDiv = document.getElementById("users");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message");

// Login Check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  loadUsers(user.uid);
  loadSavedMessages();
});

// Users
async function loadUsers(myUid) {
  usersDiv.innerHTML = "";

  const snapshot = await getDocs(collection(db, "users"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    if (data.uid !== myUid) {
      const div = document.createElement("div");

      div.innerHTML = `
        <img src="${data.photo}" width="40">
        <span>${data.name}</span>
      `;

      usersDiv.appendChild(div);
    }
  });
}

// Saved Messages Load
function loadSavedMessages() {

  const q = query(collection(db, "savedMessages"), orderBy("time"));

  onSnapshot(q, (snapshot) => {

    messagesDiv.innerHTML = "";

    snapshot.forEach((doc) => {

      const msg = document.createElement("p");
      msg.textContent = doc.data().text;

      messagesDiv.appendChild(msg);
    });

  });

}

// Send Message
document.getElementById("send").onclick = async () => {

  if (messageInput.value.trim() == "") return;

  await addDoc(collection(db, "savedMessages"), {
    text: messageInput.value,
    time: Date.now()
  });

  messageInput.value = "";
};

// Logout
document.getElementById("logout").onclick = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};
