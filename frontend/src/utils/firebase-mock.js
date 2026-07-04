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
