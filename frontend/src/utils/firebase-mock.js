// Mock implementation of Firebase App and Auth for local testing without valid api keys.

const mockApp = {
  name: "[DEFAULT]",
  options: {},
};

export function initializeApp() {
  return mockApp;
}

const mockAuth = {
  currentUser: {
    email: "test@example.com",
    uid: "mock-uid-12345",
  },
};

export function getAuth() {
  return mockAuth;
}

const listeners = new Set();

export function onAuthStateChanged(auth, callback) {
  listeners.add(callback);
  // Trigger callback immediately with the mock current user
  setTimeout(() => {
    callback(mockAuth.currentUser);
  }, 0);
  return () => {
    listeners.delete(callback);
  };
}

export function signInWithEmailAndPassword(auth, email, password) {
  mockAuth.currentUser = { email, uid: "mock-uid-12345" };
  listeners.forEach(cb => cb(mockAuth.currentUser));
  return Promise.resolve({ user: mockAuth.currentUser });
}

export function createUserWithEmailAndPassword(auth, email, password) {
  mockAuth.currentUser = { email, uid: "mock-uid-12345" };
  listeners.forEach(cb => cb(mockAuth.currentUser));
  return Promise.resolve({ user: mockAuth.currentUser });
}

export function signOut(auth) {
  mockAuth.currentUser = null;
  listeners.forEach(cb => cb(null));
  return Promise.resolve();
}

// Mock Firestore
export function getFirestore() {
  return {};
}

const mockDatabase = {
  users: {}
};

export function collection(db, path) {
  return path;
}

export function doc(db, collectionName, id) {
  return { collectionName, id };
}

export async function getDoc(docRef) {
  const collection = mockDatabase[docRef.collectionName];
  const data = collection ? collection[docRef.id] : undefined;
  return {
    exists: () => !!data,
    data: () => data
  };
}

export async function setDoc(docRef, data) {
  if (!mockDatabase[docRef.collectionName]) {
    mockDatabase[docRef.collectionName] = {};
  }
  mockDatabase[docRef.collectionName][docRef.id] = data;
}

export async function updateDoc(docRef, data) {
  if (!mockDatabase[docRef.collectionName]) {
    mockDatabase[docRef.collectionName] = {};
  }
  const existing = mockDatabase[docRef.collectionName][docRef.id] || {};
  
  let newData = { ...data };
  for (const key in newData) {
    if (newData[key] && newData[key]._isMockArrayUnion) {
      const currentArray = existing[key] || [];
      newData[key] = [...currentArray, newData[key].val];
    } else if (newData[key] && newData[key]._isMockArrayRemove) {
      const currentArray = existing[key] || [];
      newData[key] = currentArray.filter(item => item.id !== newData[key].val.id);
    }
  }
  
  mockDatabase[docRef.collectionName][docRef.id] = { ...existing, ...newData };
}

export function arrayUnion(val) {
  return { _isMockArrayUnion: true, val };
}

export function arrayRemove(val) {
  return { _isMockArrayRemove: true, val };
}
