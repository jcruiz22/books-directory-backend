import express, { Application, NextFunction, Request, Response } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/books", bookRoutes);

// 404 handler (if no route matched)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ status: 404, message: "Not Found" });
});

// Global error handler (must come last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
