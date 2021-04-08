import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD29vr6hDlRBNnNTTMG_EDGqTW6J0PuGa4",
	authDomain: "local-elections-210f5.firebaseapp.com",
	projectId: "local-elections-210f5",
	storageBucket: "local-elections-210f5.appspot.com",
	messagingSenderId: "666238817996",
	appId: "1:666238817996:web:57fd88586b301e8fe15469",
	measurementId: "G-EK2H89C8LB"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
	firebase.auth().signInWithPopup(provider)
}

export const signInAnonymously = () => {
	firebase.auth().signInAnonymously()
}

export default firebase;
