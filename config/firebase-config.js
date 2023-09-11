// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtP4qo8KRYskzzTSVcGJn68N8LOYwh2Bs",
  authDomain: "wufwalk.firebaseapp.com",
  projectId: "wufwalk",
  storageBucket: "wufwalk.appspot.com",
  messagingSenderId: "300274549833",
  appId: "1:300274549833:web:a6433cce009967a1a16b98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();