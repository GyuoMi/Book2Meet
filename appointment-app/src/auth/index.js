// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from "./config.js"
import { readable } from 'svelte/store'
import { getAnalytics } from "firebase/analytics"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const initAuth = (useRedirect = false) => {
  const auth = firebase.auth()

  const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    if (useRedirect){
      return auth.signInWithRedirect(provider)
    }
    else{
      return auth.signInWithPopup(provider)
    }
  }
  const user = readable(null, set=> {
    //check whether user is logged in or logged out
    const unsub = auth.onAuthStatechanged()
    return unsub
  })

  return {
    user,
    googleLogin
  }
}