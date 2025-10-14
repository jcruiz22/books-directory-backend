import { Request, Response, NextFunction } from "express";
import Book from "../models/book.model";

// ✅ GET all books
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    next(err as any);
  }
};

// ✅ GET a book by ID
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return next({ status: 404, message: "❌ Book not found" });
    res.status(200).json(book);
  } catch (err) {
    next(err as any);
  }
};

// ✅ POST a new book
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    next(err as any);
  }
};

// ✅ PUT (update) a book by ID
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook)
      return res.status(404).json({ message: "❌ Book not found" });
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err as any);
  }
};

// ✅ DELETE a book by ID
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "❌ Book not found" });
    res.status(200).json({ message: "✅ Book deleted successfully" });
  } catch (err) {
    next(err as any);
  }
};

// Search books by title or author (optional enhancement)
export const searchBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ message: "❌ Query parameter is required" });
    }
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};
