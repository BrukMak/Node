const express = require('express');
const mongoose = require("mongoose")
const Book = require('./models/books.model');
const app = express();
const port = 3000;
const Joi = require('joi');
const dotenv = require('dotenv');

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required()
  });

  return schema.validate(book);
}

dotenv.config();

app.use(express.json());

app.get('/', (req, res)  => {
    res.send("hello world");
} )


// Use the environment variable for MongoDB connection
const dbURI = process.env.MONGODB_URI;
// console.log('MongoDB URI:', process.env.MONGODB_URI);
// console.log('Port:', process.env.PORT);


mongoose
  .connect(
    // used dotenv to hide the connetion string
    dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database.");
    app.listen(port, () => {
      console.log(`The server is running at http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });

// Create a Book
app.post('/books', async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const book = new Book({ title: req.body.title, author: req.body.author });
        book = await book.save();
        res.send(book);
        
    } catch (error) {
        res.status(404).send(error.message);
    }
    
  });

// Get All Books
app.get('/books', async (req, res) => {

    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Get a Single Book
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.send(book);         
        
    } catch (error) {
        res.status(404).send(error.message);
    }
  });

// Update a Book
app.put('/books/:id', async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, { title: req.body.title, author: req.body.author }, { new: true });
        if (!book) return res.status(404).send('Book not found');
        res.send(book);
        
    } catch (error) {
        res.status(404).send(error.message);
    }
  });
  

// Delete a Book
app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.status(204).send("Book deleted successfully");
        
    } catch (error) {
        res.status.send(error.message)
    }
  });

  module.exports = app;
