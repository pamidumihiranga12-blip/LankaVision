// ============================================================
// LankaVision Pro - Firebase Configuration
// Project: srmobile-6091e
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyDaKFHWjMFfabGw0l1NILs_kb8hF5FCRhU",
  authDomain: "srmobile-6091e.firebaseapp.com",
  projectId: "srmobile-6091e",
  storageBucket: "srmobile-6091e.firebasestorage.app",
  messagingSenderId: "977403967748",
  appId: "1:977403967748:web:a90a347b40126ec50f3851",
  measurementId: "G-WLRJ826P2L"
};

let db = null;
let auth = null;

if (typeof firebase !== 'undefined') {
  try {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    auth = firebase.auth();

    // Enable multi-tab persistence safely
    db.enablePersistence({ synchronizeTabs: true }).catch(err => {
      console.warn('Firestore persistence warning:', err.message);
    });
  } catch (err) {
    console.warn('Firebase init error:', err);
  }
} else {
  console.error('Firebase SDK not loaded.');
}
