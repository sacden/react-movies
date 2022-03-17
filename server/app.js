const express = require("express");
const config = require("config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production") {
  console.log("Production");
} else {
  console.log("Development");
}

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
