import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "APIkey",
    authDomain: "columbia-events-management.firebaseapp.com",
    projectId: "columbia-events-management",
    storageBucket: "columbia-events-management.appspot.com",
    messagingSenderId: "536138942697",
    appId: "1:536138942697:web:aaf34aaf928694b9354878",
    measurementId: "G-Q4533L9E9W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };