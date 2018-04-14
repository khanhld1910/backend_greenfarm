import Firebase from 'firebase'
// firebase
var config = {
    apiKey: "AIzaSyDLCB0YzkLckp0Ouppn-19tQF-wdEzB3Yg",
    authDomain: "phuthinhfarming.firebaseapp.com",
    databaseURL: "https://phuthinhfarming.firebaseio.com",
    projectId: "phuthinhfarming",
    storageBucket: "phuthinhfarming.appspot.com",
    messagingSenderId: "271133580491"
}

const firebaseApp = Firebase.initializeApp(config)

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()