import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface ErrorWithStatus extends Error {
  status?: number;
  statusCode?: number;
  errors?: any;
  path?: string;
  value?: any;
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("🔥 Error caught:", err.message);

  // ✅ Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      status: 400,
      message: "Validation Error",
      details: Object.values(err.errors).map((e: any) => e.message),
    });
  }

  // ✅ Handle other Mongoose bad ObjectId errors
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      status: 400,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // ✅ Generic fallback
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
