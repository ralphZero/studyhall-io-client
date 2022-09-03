import { initializeApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

if(!getApps().length) {
    initializeApp(firebaseConfig);
}
const app = getApps()[0];

const auth = getAuth(app);

export default auth;