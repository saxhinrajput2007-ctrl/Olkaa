import { auth, db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const usersDiv = document.getElementById("users");
const chatHeader = document.getElementById("chatHeader");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");

let myUid = "";
let selectedUser = null;

// Login Check
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  myUid = user.uid;
  loadUsers(user.uid);

});

// Load Users
async function loadUsers(uid) {

  usersDiv.innerHTML = "";

  const snapshot = await getDocs(collection(db, "users"));

  snapshot.forEach((docSnap) => {

    const data = docSnap.data();

    if (data.uid !== uid) {

      const div = document.createElement("div");
      div.className = "user";

      div.innerHTML = `
        <img src="${data.photo}">
        <span>${data.name}</span>
      `;

      div.onclick = () => {

        selectedUser = data;

        chatHeader.innerText = data.name;

        loadMessages();

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
// Send Message
sendBtn.onclick = async () => {

  if (!selectedUser) {
    alert("Select a user first");
    return;
  }

  if (messageInput.value.trim() === "") return;

  await addDoc(collection(db, "messages"), {
    sender: myUid,
    receiver: selectedUser.uid,
    text: messageInput.value,
    time: serverTimestamp()
  });

  messageInput.value = "";

};

// Load Messages
function loadMessages() {

  messagesDiv.innerHTML = "";

  const q = query(
    collection(db, "messages"),
    orderBy("time")
  );

  onSnapshot(q, (snapshot) => {

    messagesDiv.innerHTML = "";

    snapshot.forEach((doc) => {

      const data = doc.data();

      if (
        (data.sender === myUid &&
         data.receiver === selectedUser.uid) ||

        (data.sender === selectedUser.uid &&
         data.receiver === myUid)
      ) {

        const div = document.createElement("div");

        div.style.margin = "10px";
        div.style.padding = "10px";
        div.style.borderRadius = "10px";

        if (data.sender === myUid) {
          div.style.background = "#0084ff";
          div.style.textAlign = "right";
        } else {
          div.style.background = "#444";
          div.style.textAlign = "left";
        }

        div.innerText = data.text;

        messagesDiv.appendChild(div);

      }

    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  });

}
