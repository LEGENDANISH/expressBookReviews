const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");

const public_users = express.Router();


// Get all books using Axios
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/books');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve books",
      error: error.message
    });
  }
});


// Get book by ISBN using Axios
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const book = books[isbn];

    if (!book) {
      return res.status(404).json({
        message: "Book not found for given ISBN"
      });
    }

    return res.status(200).json(book);

  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving book by ISBN",
      error: error.message
    });
  }
});


// Get books by author using Axios + validation
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;

  try {
    const filtered = Object.values(books).filter(
      book => book.author.toLowerCase() === author.toLowerCase()
    );

    if (filtered.length === 0) {
      return res.status(404).json({
        message: "No books found for this author"
      });
    }

    return res.status(200).json(filtered);

  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving books by author",
      error: error.message
    });
  }
});


// Get books by title using Axios + validation
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;

  try {
    const filtered = Object.values(books).filter(
      book => book.title.toLowerCase() === title.toLowerCase()
    );

    if (filtered.length === 0) {
      return res.status(404).json({
        message: "No books found with this title"
      });
    }

    return res.status(200).json(filtered);

  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving books by title",
      error: error.message
    });
  }
});

module.exports.general = public_users;
