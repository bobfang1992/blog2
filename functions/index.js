const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const NOTION_API_BASE_URL = "https://api.notion.com/v1";
const NOTION_API_KEY = functions.config().notion.key;

app.post("/query", function (req, res) {
  const { databaseId } = req.query;

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
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data from Notion API:", error);
      res.status(500).json({ error: "An error occurred while fetching data from Notion API" });
    });
});


exports.notionProxy = functions.https.onRequest(app);

