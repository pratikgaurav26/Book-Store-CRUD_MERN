import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "Send all the required fields: title, author, publishedYear ",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get all the books from db
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get one book from db using id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.findById(id);

    return res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for Update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({ message: "Send all the required fields" });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: `book with id ${id} not found` });
    }

    return res
      .status(200)
      .send({ message: "Details are updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route for deleting a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: `book with id ${id} not found` });
    }

    return res.status(200).send({ message: "Book Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
