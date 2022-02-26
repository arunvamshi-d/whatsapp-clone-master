import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXYqQrqShctinWeRN50z3CYueyikIIwk0",
  authDomain: "whatsapp-clone-340713.firebaseapp.com",
  projectId: "whatsapp-clone-340713",
  storageBucket: "whatsapp-clone-340713.appspot.com",
  messagingSenderId: "544730889145",
  appId: "1:544730889145:web:6a9bd8957004448dd7d468"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth= firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth , provider}
  export default db