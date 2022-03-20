//Require express
const express = require("express");
const config = require("config");
const fetch = require("node-fetch");
const cors = require("cors");
const redis = require("redis");
const { promisify } = require("util");
var bodyParser = require("body-parser");

const url = require("url");
let queryURL;

//Create an instance of Express
const app = express();

const client = redis.createClient(6379);

(async () => {
  client.on("error", (err) => {
    console.log("Redis Client Error", err);
  });
  client.on("ready", () => console.log("Redis is ready"));

  await client.connect();

  await client.ping();
})();

//parse body for getting login and password
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = config.get("port") ?? 8080;

app.use(cors());

app.use("/login", (req, res) => {
  if (req.body.username === "test" && req.body.password === "123") {
    res.send({
      token: true,
    });
  } else {
    res.send({
      token: false,
    });
  }
});

app.get("/api", (req, res) => {
  try {
    queryURL = url.parse(req.url).query;
    res.send("ok");
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/movies", async (req, res) => {
  try {
    const API = "apikey=12dbe7d7&";
    const api_url = `http://www.omdbapi.com/?${API}${queryURL}`;

    const response = await fetch(api_url);
    const json = await response.json();

    //saving to redis cache
    await client.set("key", JSON.stringify(json));

    //getting cache from redis
    // const result = await client.get("key");
    // console.log("movies: " + result);

    res.json(json);
  } catch (error) {
    res.send(error.message);
  }
});

// start the server in the port 8080
app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
