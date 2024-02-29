// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0puFfqrLl_74HQCfS0cjMMCvB_aVw2dM",
  authDomain: "sky24-icas-5395c.firebaseapp.com",
  projectId: "sky24-icas-5395c",
  storageBucket: "sky24-icas-5395c.appspot.com",
  messagingSenderId: "863434283378",
  appId: "1:863434283378:web:5a55f3d88cb71e4eefe5eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export let db = getFirestore(app);
// const analytics = getAnalytics(app);
