import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCw2C5y_61KwPcADFinfM7_tHokR2qtK_o',
  authDomain: 'chestmusic-60121.firebaseapp.com',
  projectId: 'chestmusic-60121',
  storageBucket: 'chestmusic-60121.appspot.com',
  messagingSenderId: '979236653689',
  appId: '1:979236653689:web:c38f79df78123451e1e2a8',
  measurementId: 'G-M7DBY812GP'
};

const app = initializeApp(config);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, config, provider }; 
