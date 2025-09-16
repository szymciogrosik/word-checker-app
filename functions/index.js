import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

const CLOUD_RUN_URL = "https://scrabble-search-255717563537.europe-central2.run.app";

export const searchExact = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be logged in to call this function.'
    );
  }

  const word = data.word;
  if (!word) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Word must be provided'
    );
  }

  try {
    const response = await axios.get(`${CLOUD_RUN_URL}/exact?q=${encodeURIComponent(word)}`);
    return response.data;
  } catch (err) {
    console.error('Error calling Cloud Run:', err.message || err);
    throw new functions.https.HttpsError(
      'internal',
      err.response?.data || err.message
    );
  }
});
