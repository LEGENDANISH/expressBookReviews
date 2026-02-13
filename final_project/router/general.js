const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Get all books
public_users.get('/', async function (req, res) {
  try {
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    return res.status(200).json(books[isbn]);
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving book by ISBN" });
  }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    let filtered = Object.values(books).filter(
      (book) => book.author.toLowerCase() === author.toLowerCase()
    );
    return res.status(200).json(filtered);
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving books by author" });
  }
});

// Get books based on title
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    let filtered = Object.values(books).filter(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );
    return res.status(200).json(filtered);
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving books by title" });
  }
});

module.exports.general = public_users;
