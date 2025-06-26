// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Models
const Reader = mongoose.model("Reader", new mongoose.Schema({
  id: { type: String, required: true },
  name: String,
  gender: String,
  birthDay: String,
  height: String,
  weight: String,
  employment: String,
}));

const Book = mongoose.model("Book", new mongoose.Schema({
  id: String,
  name: String,
  title: String,
  publicDate: String,
  author: String,
  genre: String,
  publisher: String,
  language: String,
}));

// Routes

// Add Reader
app.post("/addReader", async (req, res) => {
  try {
    const reader = new Reader(req.body);
    await reader.save();
    res.send("Reader added successfully");
  } catch (err) {
    console.error("Error adding reader:", err);
    res.status(500).send("Error adding reader");
  }
});

// Add Book
app.post("/addBook", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.send("Book added successfully");
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Error adding book");
  }
});

// Remove Reader
app.post("/removeReader", async (req, res) => {
  try {
    await Reader.deleteOne({ id: req.body.id });
    res.send("Reader removed");
  } catch (err) {
    res.status(500).send("Error removing reader");
  }
});

// Search Reader
app.get("/searchReader", async (req, res) => {
  const search = String(req.query.search || "");

  try {
    const result = await Reader.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { id: search }
      ],
    });
    res.json(result);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).send("Error searching reader");
  }
});

// Get All Readers
app.get("/getReadersInfo", async (req, res) => {
  try {
    const readers = await Reader.find();
    res.json(readers);
  } catch (err) {
    res.status(500).send("Error getting readers info");
  }
});

// Search Book (clean version)
app.get("/searchBook", async (req, res) => {
  const search = req.query.search;

  if (!search || typeof search !== 'string') {
    return res.status(400).send("Invalid search query");
  }

  try {
    const result = await Book.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { id: search }
      ],
    });
    res.json(result);
  } catch (err) {
    res.status(500).send("Error searching book");
  }
});

// Get All Books
app.get("/getBooksInfo", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send("Error getting books info");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
