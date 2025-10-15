import express from "express";
import { getBooks, createBook, updateBook, deleteBook, getBookById, searchBooks, filterBooks, getSideBarOptions } from "../controllers/bookController";

const router = express.Router();

// Routes
router.get("/", getBooks); // GET all books
router.get("/search", searchBooks); // Search books by title or author
router.get("/filter", filterBooks); // Filter books by genre, author, year
router.get("/sidebar", getSideBarOptions); // Get sidebar options (genres, authors, years)
router.get("/:id", getBookById); // GET a book by ID
router.post("/", createBook); // POST a new book
router.put("/:id", updateBook); // PUT (update) a book by ID
router.delete("/:id", deleteBook); // DELETE a book by ID



export default router;

