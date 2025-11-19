/**
 * @summary
 * Global error handling middleware
 * Catches and formats all application errors
 *
 * @module middleware/error
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @interface ErrorResponse
 * @description Standard error response structure
 */
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @summary
 * Global error handling middleware
 *
 * @param {Error} error - Error object
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
export async function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  console.error('Error caught by middleware:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  const statusCode = error.statusCode || error.status || 500;
  const errorCode = error.code || 'INTERNAL_SERVER_ERROR';
  const errorMessage = error.message || 'An unexpected error occurred';

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: errorCode,
      message: errorMessage,
      ...(process.env.NODE_ENV === 'development' && { details: error.stack }),
    },
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(errorResponse);
}
