import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBCDKD8vjzXsHrqAmh6frWsiIvzSZ4nIF0",
  authDomain: "vahlay1.firebaseapp.com",
  databaseURL: "https://vahlay1-default-rtdb.firebaseio.com",
  projectId: "vahlay1",
  storageBucket: "vahlay1.appspot.com",
  messagingSenderId: "991050597848",
  appId: "1:991050597848:web:4aa1d20773abeae4fbdead",
  measurementId: "G-7DSEC2CR2P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };