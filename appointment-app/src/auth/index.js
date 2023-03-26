import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from './firebaseConfig.js'
import { readable } from 'svelte/store'
import  "firebase/database";
firebase.initializeApp(firebaseConfig)


const database = firebase.database();
//authentication
export const initAuth = () => {
  const auth  = firebase.auth()

  const loginWithGoogle = () => {
    // Using a redirect.
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential instanceof firebase.auth.OAuthCredential) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
    }
    var user = result.user;
  });
  
  // Start a sign in process for an unauthenticated user.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);


  return{
    loginWithGoogle
  }
  }
  
}

export const insertEventIntoDatabase = (eventData) =>{
  const newEvent = database.ref('clients').push(eventData);
}