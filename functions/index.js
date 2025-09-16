import * as functions from "firebase-functions";
import axios from "axios";

const CLOUD_RUN_URL = "https://scrabble-search-255717563537.europe-central2.run.app";

export const scrabbleApi = functions.https.onRequest(async (req, res) => {
  try {
    const url = `${CLOUD_RUN_URL}${req.url}`;

    const method = req.method;
    const headers = { ...req.headers };
    delete headers.host;

    const axiosConfig = { url, method, headers };

    if (method !== 'GET' && method !== 'HEAD') {
      axiosConfig.data = req.body;
    }

    const response = await axios(axiosConfig);

    res.status(response.status).send(response.data);
  } catch (err) {
    console.error(err);
    res.status(err.response?.status || 500).send(err.response?.data || err.message);
  }
});
