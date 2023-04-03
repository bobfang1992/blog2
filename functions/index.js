const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { PubSub } = require("@google-cloud/pubsub");

const pubSubClient = new PubSub();

const app = express();
app.use(cors());

const NOTION_API_BASE_URL = "https://api.notion.com/v1";
const NOTION_API_KEY = functions.config().notion.key;

const cache = new Map();
const CACHE_EXPIRATION = 5 * 60 * 1000; // 1 minute in milliseconds

app.post("/query", function (req, res) {
  const { databaseId } = req.query;

  const currentTime = Date.now();
  const cachedData = cache.get(databaseId);

  if (cachedData && currentTime - cachedData.timestamp < CACHE_EXPIRATION) {
    res.json(cachedData.data);
    return;
  }

  axios
    .post(
      `${NOTION_API_BASE_URL}/databases/${databaseId}/query`,
      {},
      {
        headers: {
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${NOTION_API_KEY}`,
        },
      }
    )
    .then((response) => {
      const data = response.data;
      cache.set(databaseId, { data, timestamp: currentTime });
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data from Notion API:", error);
      res.status(500).json({ error: "An error occurred while fetching data from Notion API", message: error.message });
    });
});

exports.notionProxy = functions.https.onRequest(app);

function callNotionProxy(databaseId) {
  return new Promise((resolve, reject) => {
    const message = { databaseId };
    const messageId = pubSubClient.topic('notion-proxy').publishJSON(message);
    messageId
      .then((messageId) => {
        console.log(`Message ${messageId} published.`);
        resolve();
      })
      .catch((error) => {
        console.error('Error publishing message:', error);
        reject(error);
      });
  });
}

exports.scheduledFunction = functions.pubsub
  .schedule("every 1 minutes")
  .onRun(async (context) => {
    // Call your existing function here with the appropriate databaseId
    const databaseId = "c3561f23082f491fa4b502a83db609ea";
    await callNotionProxy(databaseId);
  });

exports.notionProxyTrigger = functions.pubsub
  .topic("notion-proxy")
  .onPublish(async (message) => {
    const { databaseId } = message.json;
    await app.post("/query", { query: { databaseId } });
  });
