const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const path = require("path");

// Update the path to point to your serviceAccountKey.json
// const serviceAccountPath = path.join(__dirname, './serviceAccountKey.json');
const serviceAccountPath = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccountPath),
});
const db = getFirestore();

module.exports = db;
