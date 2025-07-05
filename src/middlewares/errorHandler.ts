import { Request, Response } from "express";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware bắt lỗi toàn cục
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response
): void => {
  const statusCode = (err instanceof AppError && err.statusCode) || 500;

  const errorResponse = {
    success: false,
    message: err.message || "Internal server Error",
    status: statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Chỉ show stack khi dev
  };
  res.status(statusCode).json(errorResponse);
};

// Hàm tiện ích để trả lỗi trong controller mà không cần throw
export const sendErrorResponse = (
  res: Response,
  message = "Internal server Error",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    status: statusCode,
  });
};
