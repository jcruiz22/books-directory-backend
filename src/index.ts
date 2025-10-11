import express, { Application } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/books", bookRoutes);


// Root route for testing
app.get("/", (req, res) => {
  res.send("📚 Books Directory API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
