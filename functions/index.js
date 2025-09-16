const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const CLOUD_RUN_URL = "SEARCH_WORD_API_URL_PLACEHOLDER";

exports.searchExact = onCall(async (request) => {
  try {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be logged in to call this function."
      );
    }

    console.log("searchExact: called. uid:", request.auth.uid);
    console.log("searchExact: payload data:", request.data);

    const word = request.data?.word;
    if (!word) {
      throw new HttpsError("invalid-argument", "Missing word parameter.");
    }

    const url = `${CLOUD_RUN_URL}/exact?q=${encodeURIComponent(word)}`;
    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    console.error(err);
    if (err.response) {
      throw new HttpsError("internal", err.response.data || err.message);
    }
    throw new HttpsError("internal", err.message);
  }
});
