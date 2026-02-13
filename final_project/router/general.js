const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

// Get all books
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Get book by ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    return res.status(200).json(books[isbn]);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving book" });
  }
});

// Get books by author
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const filtered = Object.values(books).filter(
      book => book.author.toLowerCase() === author.toLowerCase()
    );
    return res.status(200).json(filtered);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving author books" });
  }
});

// Get books by title
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const filtered = Object.values(books).filter(
      book => book.title.toLowerCase() === title.toLowerCase()
    );
    return res.status(200).json(filtered);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving title books" });
  }
});

module.exports.general = public_users;
