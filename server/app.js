//Require express
const express = require("express");
const config = require("config");
const fetch = require("node-fetch");

const url = require("url");
let queryURL;

//Create an instance of Express
const app = express();

const PORT = config.get("port") ?? 8080;

app.get("/api", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  queryURL = url.parse(req.url).query;
});

app.get("/movies", async (req, res) => {
  const API = "apikey=12dbe7d7&";
  const api_url = `http://www.omdbapi.com/?${API}${queryURL}`;

  const response = await fetch(api_url);
  const json = await response.json();
  res.json(json);
});

// start the server in the port 8080
app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
