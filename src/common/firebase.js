import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANgOiQ_zrylOT7BE88k_PUftDWvIJLyY8",
  authDomain: "freelancer-clone.firebaseapp.com",
  databaseURL: "https://freelancer-clone.firebaseio.com",
  projectId: "freelancer-clone",
  storageBucket: "freelancer-clone.appspot.com",
  messagingSenderId: "385363868308",
  appId: "1:385363868308:web:50a4f217d67330f4275281",
  measurementId: "G-C1SD2HZK5W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, db, storage, provider };
