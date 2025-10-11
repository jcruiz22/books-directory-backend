import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
  statusCode?: number;
  errors?: any;
  path?: string;
  value?: any;
}

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for debugging
  console.error(err);
  // Determine status code and message
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Handle Mongoose validation errorsif
  if (err.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ${err.path}: ${err.value}.`,
    });
  }
  return res.status(statusCode).json({
    status: statusCode,
    message,
    // Include stack trace only when not in production
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
