const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const CLOUD_RUN_URL = "https://scrabble-search-255717563537.europe-central2.run.app";

exports.searchExact = functions.https.onCall(async (data, context) => {
  try {
    // if (!context.auth) {
    //   throw new functions.https.HttpsError(
    //     'unauthenticated',
    //     'User must be logged in to call this function.'
    //   );
    // }

    console.log("searchExact: called. auth:", !!context.auth, "uid:", context.auth?.uid);
    console.log("searchExact: payload data:", data);
    const word = data?.data?.word;
    console.log("searchExact: word =", word);
    if (!word) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing word parameter');
    }

    const url = `${CLOUD_RUN_URL}/exact?q=${encodeURIComponent(word)}`;
    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    console.error(err);
    if (err.response) {
      throw new functions.https.HttpsError('internal', err.response.data || err.message);
    }
    throw new functions.https.HttpsError('internal', err.message);
  }
});
