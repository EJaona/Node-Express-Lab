const express = require("express");

const db = require("./data/db");

const router = express.Router();

server.get("/", async (req, res) => {
  try {
    const users = await db.find(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The users information could not be retrieved "
    });
  }
});

server.get("/:id", async (req, res) => {
  try {
    const user = await db.findById(req.params);
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(400).json({
        success: false,
        message: "The user with the specified ID does not exist"
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
});

server.put("/:id", async (req, res) => {
  try {
    const changes = req.body;
    const id = req.params;

    const updated = await db.update(id, changes);

    if (updated) {
      res.status(200).json({ success: true, updated });
    } else {
      return Promise.reject({
        code: 404,
        message: "The user with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(err.code).json({ success: false, message: err.message });
  }
});

server.post("/api/users", async (req, res) => {
  try {
    const user = req.body;
    const user = await db.insert(user);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(err.code).json({ success: false, message: err.message });
  }
});

server.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await db.remove(userId);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({
        success: false,
        message: "he user with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(err.code).json({ success: false, message: err.message });
  }
});

module.exports = router;
