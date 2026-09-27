import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let firestoreInstance;
if (typeof window !== 'undefined') {
  try {
    firestoreInstance = initializeFirestore(
      app,
      {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      },
      firebaseConfig.firestoreDatabaseId || '(default)'
    );
  } catch {
    firestoreInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
  }
} else {
  firestoreInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
}

export const db = firestoreInstance;
export default app;
