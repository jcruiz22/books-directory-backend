import express from "express";
import { getBooks, createBook, updateBook, deleteBook, getBookById } from "../controllers/bookController";

const router = express.Router();

// Routes
router.get("/", getBooks); // GET all books
router.get("/:id", getBookById); // GET a book by ID
router.post("/", createBook); // POST a new book
router.put("/:id", updateBook); // PUT (update) a book by ID
router.delete("/:id", deleteBook); // DELETE a book by ID

export default router;

