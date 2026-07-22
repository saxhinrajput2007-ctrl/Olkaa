import { auth, db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc
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
const logoutBtn = document.getElementById("logout");

let myUid = "";
let selectedUser = null;

// Login Check
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  myUid = user.uid;

  try {
    await updateDoc(doc(db, "users", myUid), {
      online: true
    });
  } catch (e) {
    console.log(e);
  }

  loadUsers();

  window.addEventListener("beforeunload", async () => {
    try {
      await updateDoc(doc(db, "users", myUid), {
        online: false
      });
    } catch (e) {}
  });

});

// Load Users
async function loadUsers() {

  usersDiv.innerHTML = "";

  const snapshot = await getDocs(collection(db, "users"));

  snapshot.forEach((docSnap) => {

    const data = docSnap.data();

    if (data.uid === myUid) return;

    const div = document.createElement("div");
    div.className = "user";

    div.innerHTML = `
      <img src="${data.photo}" width="45" height="45">
      <div>
        <b>${data.name}</b><br>
        <small>${data.online ? "🟢 Online" : "⚪ Offline"}</small>
      </div>
    `;

    div.onclick = () => {
      selectedUser = data;
      chatHeader.innerText = data.name;
      loadMessages();
    };

    usersDiv.appendChild(div);

  });

}

// Logout
logoutBtn.onclick = async () => {

  try {
    await updateDoc(doc(db, "users", myUid), {
      online: false
    });
  } catch (e) {}

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

  if (!selectedUser) return;

  const q = query(
    collection(db, "messages"),
    orderBy("time")
  );

  onSnapshot(q, (snapshot) => {

    messagesDiv.innerHTML = "";

    snapshot.forEach((docSnap) => {

      const data = docSnap.data();

      if (
        (data.sender === myUid && data.receiver === selectedUser.uid) ||
        (data.sender === selectedUser.uid && data.receiver === myUid)
      ) {

        const div = document.createElement("div");

        div.style.margin = "10px";
        div.style.padding = "10px";
        div.style.borderRadius = "10px";
        div.style.maxWidth = "70%";

        if (data.sender === myUid) {
          div.style.background = "#0084ff";
          div.style.marginLeft = "auto";
          div.style.textAlign = "right";
        } else {
          div.style.background = "#444";
          div.style.marginRight = "auto";
          div.style.textAlign = "left";
        }

        div.innerText = data.text;

        messagesDiv.appendChild(div);

      }

    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  });

}
