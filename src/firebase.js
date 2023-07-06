// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

//  Replace with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	// The value of `databaseURL` depends on the location of the database
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//The following is to get the image URLs from firebase database
/* const getFirebaseImageURLs = async () => {
	const snapshot = await firebase.database().ref('images').once('value');
	const data = snapshot.val();

	if (data) {
		// Extract the image URLs from the snapshot data
		const imageURLs = Object.values(data).map((image) => image.url);
		return imageURLs;
	}
	return [];
};
module.exports = { getFirebaseImageURLs }; */


// Get a reference to the database service and export the reference for other modules
// export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);

