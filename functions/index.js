const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

// URL of your application at Cloud Run
const CLOUD_RUN_URL = "https://scrabble-search-255717563537.europe-central2.run.app";

exports.scrabbleApi = functions.https.onRequest(async (req, res) => {
  try {
    // 1. Authorization header verification
    const authHeader = req.headers.authorization || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

    if (!idToken) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    // 2. Verification of the Firebase token
    await admin.auth().verifyIdToken(idToken);

    // 3. Forward do Cloud Run
    const response = await axios({
      method: req.method,
      url: `${CLOUD_RUN_URL}${req.url}`, // np. /exact?q=test
      data: req.body,
      headers: { "Content-Type": "application/json" }
    });

    // 4. Referring the answer to Angular
    res.status(response.status).json(response.data);

  } catch (error) {
    console.error(error);
    res.status(403).json({ error: "Unauthorized or invalid request" });
  }
});
