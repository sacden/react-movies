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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = redis.createClient({
  host: "http://127.0.0.1/",
  port: 3000,
});

// const GET_ASYNC = promisify(client.get).bind(client);
// const SET_ASYNC = promisify(client.set).bind(client);

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
    // const reply = await GET_ASYNC("search");
    // console.log("reply: " + reply);
    // if (reply) {
    //   console.log("using cached data");
    //   res.send(JSON.parse(reply));
    //   return;
    // }

    const API = "apikey=12dbe7d7&";
    const api_url = `http://www.omdbapi.com/?${API}${queryURL}`;

    const response = await fetch(api_url);
    const json = await response.json();
    // console.log(json);

    // const saveResult = await SET_ASYNC("Search", JSON.stringify(response), "EX", 5);
    // console.log("new data cached", saveResult);

    res.json(json);
  } catch (error) {
    res.send(error.message);
  }
});

// start the server in the port 8080
app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
