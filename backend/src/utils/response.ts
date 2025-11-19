/**
 * @summary
 * Response formatting utilities
 * Provides standardized response structures
 *
 * @module utils/response
 */

/**
 * @interface SuccessResponse
 * @description Standard success response structure
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    page?: number;
    pageSize?: number;
    total?: number;
    timestamp: string;
  };
}

/**
 * @interface ErrorResponse
 * @description Standard error response structure
 */
export interface ErrorResponse {
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
 * Creates a standardized success response
 *
 * @param {T} data - Response data
 * @param {object} metadata - Optional metadata
 * @returns {SuccessResponse<T>} Formatted success response
 */
export function successResponse<T>(data: T, metadata?: any): SuccessResponse<T> {
  return {
    success: true,
    data,
    ...(metadata && {
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
      },
    }),
  };
}

/**
 * @summary
 * Creates a standardized error response
 *
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {any} details - Optional error details
 * @returns {ErrorResponse} Formatted error response
 */
export function errorResponse(
  message: string,
  code: string = 'ERROR',
  details?: any
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
    timestamp: new Date().toISOString(),
  };
}
