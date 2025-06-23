// src/app/middleware/handleErrors.ts

import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.name === "ValidationError") {
    const errorDetails: any = {};
    for (const key in err.errors) {
      const fieldError = err.errors[key];
      errorDetails[key] = {
        message: fieldError.message,
        name: fieldError.name,
        properties: fieldError.properties,
        kind: fieldError.kind,
        path: fieldError.path,
        value: fieldError.value,
      };
    }

    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: err.name,
        errors: errorDetails,
      },
    });
    return;
  }

  // fallback error response
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
    success: false,
    error: err,
  });
};
