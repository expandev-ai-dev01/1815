/**
 * @summary
 * 404 Not Found middleware
 * Handles requests to non-existent routes
 *
 * @module middleware/notFound
 */

import { Request, Response } from 'express';

/**
 * @summary
 * Handles 404 Not Found errors
 *
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
      path: req.path,
      method: req.method,
    },
    timestamp: new Date().toISOString(),
  });
}
