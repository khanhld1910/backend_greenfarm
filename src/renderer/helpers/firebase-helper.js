import firebase from "@firebase/app"
import "@firebase/database"
import '@firebase/storage'
// firebase
var config = {
    apiKey: "AIzaSyDLCB0YzkLckp0Ouppn-19tQF-wdEzB3Yg",
    authDomain: "phuthinhfarming.firebaseapp.com",
    databaseURL: "https://phuthinhfarming.firebaseio.com",
    projectId: "phuthinhfarming",
    storageBucket: "phuthinhfarming.appspot.com",
    messagingSenderId: "271133580491"
}
// tao console log ko thay phuong thuc do
firebase.initializeApp(config)

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
const db = firebase.database()
const storage = firebase.storage()

export { db, storage }