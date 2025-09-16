const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors");

admin.initializeApp();

const corsHandler = cors({ origin: true });

const CLOUD_RUN_URL = "https://scrabble-search-255717563537.europe-central2.run.app";

exports.searchExact = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).send("User must be logged in");
      }

      const idToken = authHeader.split("Bearer ")[1];
      await admin.auth().verifyIdToken(idToken);

      const url = `${CLOUD_RUN_URL}${req.url}`;
      const method = req.method;
      const headers = { ...req.headers };
      delete headers.host;

      const axiosConfig = { url, method, headers };
      if (method !== "GET" && method !== "HEAD") {
        axiosConfig.data = req.body;
      }

      const response = await axios(axiosConfig);
      res.status(response.status).send(response.data);
    } catch (err) {
      console.error(err);
      res.status(err.response?.status || 500).send(err.response?.data || err.message);
    }
  });
});
