const express = require(express);

const router = require("./routes");

const server = express();

server.use(express.json());

server.use("api/users", router);

server.get("/", async (req, res) => {
  res.send("Welcome to the users api");
});

module.exports = server;
