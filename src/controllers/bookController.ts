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
    const bookData = req.body; // Expecting a single book object
    // Check if bookData is an array (for multiple books) or a single object
    if (Array.isArray(bookData)) {
      // If it's an array, use insertMany to add multiple books
      const newBooks = await Book.insertMany(bookData);
      res.status(201).json(newBooks);
    } else {
      // If it's a single object, create and save one book
      const newBook = new Book(bookData);
      await newBook.save();
      res.status(201).json(newBook);
    }
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

// Search books by title or author
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

// Filter books by genre, author, year
export const filterBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { author, genre, year, page = "1", limit = "10", sort } = req.query;
    if (!author && !genre && !year) {
      return res.status(400).json({
        message:
          "❌ At least one filter parameter (author, genre, year) is required",
      });
    }

    const filter: any = {};

    if (author) filter.author = { $regex: new RegExp(author as string, "i") };
    if (genre) filter.genre = genre;
    if (year) filter.publishedYear = Number(year);

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    let sortOption: any = {};
    if (sort) {
      const direction = (sort as string).startsWith("-") ? -1 : 1;
      const field = (sort as string).replace("-", "");
      sortOption = { [field]: direction };
    }

    // Query with pagination and sorting
    const books = await Book.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);
    const total = await Book.countDocuments(filter);

    res.status(200).json({
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      results: books,
    });
  } catch (err) {
    next(err as any);
  }
};

// Sidebar option - get distinct genres, authors and years
export const getSideBarOptions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [authors, genres, years] = await Promise.all([
            Book.aggregate([
                { $group: { _id: "$author", count: { $sum: 1 } } },
                { $sort: { _id: 1 } },
            ]),
            Book.aggregate([
                { $group: { _id: "$genre", count: { $sum: 1 } } },
                { $sort: { _id: 1 } },
            ]),
            Book.aggregate([
                { $group: { _id: "$publishedYear", count: { $sum: 1 } } },
                { $sort: { _id: -1 } },
            ])
        ]);

        res.status(200).json({
            authors: authors.map((a) => ({ name: a._id, count: a.count })),
            genres: genres.map((g) => ({ name: g._id, count: g.count })),
            years: years.map((y) => ({ name: y._id, count: y.count })),
        });
    } catch (err) {
        next(err as any);
    }
};
