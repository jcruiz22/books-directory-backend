import { Request, Response } from "express";
import Book from "../models/book.model";

// ✅ GET all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching books", error: err });
  }
};

// ✅ GET a book by ID
export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "❌ Book not found" });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: "❌ Error fetching book", error: err });
    }
};

// ✅ POST a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: "❌ Error creating book", error: err });
  }
};

// ✅ PUT (update) a book by ID
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) return res.status(404).json({ message: "❌ Book not found" });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: "❌ Error updating book", error: err });
  }
};

// ✅ DELETE a book by ID
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "❌ Book not found" });
    res.status(200).json({ message: "✅ Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "❌ Error deleting book", error: err });
  }
};
