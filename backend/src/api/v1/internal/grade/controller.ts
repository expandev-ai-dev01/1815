/**
 * @summary
 * Grade management controller
 * Handles all CRUD operations for student grades
 *
 * @module api/v1/internal/grade/controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { gradeCreate, gradeList, gradeGet, gradeUpdate, gradeDelete } from '@/services/grade';
import { successResponse, errorResponse } from '@/utils/response';

/**
 * @api {get} /api/v1/internal/grade List Grades
 * @apiName ListGrades
 * @apiGroup Grade
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all grades with optional filters
 *
 * @apiParam {String} [studentName] Filter by student name (partial match)
 * @apiParam {String} [subject] Filter by subject (partial match)
 * @apiParam {String} [institutionType] Filter by institution type
 *
 * @apiSuccess {Array} data Array of grade records
 * @apiSuccess {Number} data.id Grade identifier
 * @apiSuccess {String} data.studentName Student name
 * @apiSuccess {String} data.subject Subject name
 * @apiSuccess {Number} data.gradeValue Grade value (0-10)
 * @apiSuccess {String} data.institutionType Institution type
 * @apiSuccess {String} data.createdAt Creation timestamp
 * @apiSuccess {String} data.updatedAt Last update timestamp
 *
 * @apiError {String} ValidationError Invalid filter parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { studentName, subject, institutionType } = req.query;

    const data = await gradeList({
      studentName: studentName as string | undefined,
      subject: subject as string | undefined,
      institutionType: institutionType as string | undefined,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {post} /api/v1/internal/grade Create Grade
 * @apiName CreateGrade
 * @apiGroup Grade
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new grade record
 *
 * @apiParam {String} studentName Student name (3-100 characters)
 * @apiParam {String} subject Subject name (2-50 characters)
 * @apiParam {Number} gradeValue Grade value (0-10, 2 decimal places)
 * @apiParam {String} [institutionType] Institution type
 *
 * @apiSuccess {Number} id Created grade identifier
 * @apiSuccess {String} studentName Student name
 * @apiSuccess {String} subject Subject name
 * @apiSuccess {Number} gradeValue Grade value
 * @apiSuccess {String} institutionType Institution type
 * @apiSuccess {String} createdAt Creation timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bodySchema = z.object({
      studentName: z.string().min(3).max(100),
      subject: z.string().min(2).max(50),
      gradeValue: z.number().min(0).max(10),
      institutionType: z.enum(['Tutoria Particular', 'Escola Pequena', 'Outro']).optional(),
    });

    const validated = bodySchema.parse(req.body);

    const data = await gradeCreate(validated);

    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /api/v1/internal/grade/:id Get Grade
 * @apiName GetGrade
 * @apiGroup Grade
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a specific grade by ID
 *
 * @apiParam {Number} id Grade identifier
 *
 * @apiSuccess {Number} id Grade identifier
 * @apiSuccess {String} studentName Student name
 * @apiSuccess {String} subject Subject name
 * @apiSuccess {Number} gradeValue Grade value
 * @apiSuccess {String} institutionType Institution type
 * @apiSuccess {String} createdAt Creation timestamp
 * @apiSuccess {String} updatedAt Last update timestamp
 *
 * @apiError {String} NotFound Grade not found
 * @apiError {String} ValidationError Invalid ID parameter
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const validated = paramsSchema.parse(req.params);

    const data = await gradeGet(validated.id);

    if (!data) {
      res.status(404).json(errorResponse('Grade not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Invalid ID parameter', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {put} /api/v1/internal/grade/:id Update Grade
 * @apiName UpdateGrade
 * @apiGroup Grade
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing grade
 *
 * @apiParam {Number} id Grade identifier
 * @apiParam {String} studentName Student name (3-100 characters)
 * @apiParam {String} subject Subject name (2-50 characters)
 * @apiParam {Number} gradeValue Grade value (0-10, 2 decimal places)
 * @apiParam {String} [institutionType] Institution type
 *
 * @apiSuccess {Number} id Grade identifier
 * @apiSuccess {String} studentName Student name
 * @apiSuccess {String} subject Subject name
 * @apiSuccess {Number} gradeValue Grade value
 * @apiSuccess {String} institutionType Institution type
 * @apiSuccess {String} updatedAt Update timestamp
 *
 * @apiError {String} NotFound Grade not found
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const bodySchema = z.object({
      studentName: z.string().min(3).max(100),
      subject: z.string().min(2).max(50),
      gradeValue: z.number().min(0).max(10),
      institutionType: z.enum(['Tutoria Particular', 'Escola Pequena', 'Outro']).optional(),
    });

    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const data = await gradeUpdate(validatedParams.id, validatedBody);

    if (!data) {
      res.status(404).json(errorResponse('Grade not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {delete} /api/v1/internal/grade/:id Delete Grade
 * @apiName DeleteGrade
 * @apiGroup Grade
 * @apiVersion 1.0.0
 *
 * @apiDescription Permanently deletes a grade
 *
 * @apiParam {Number} id Grade identifier
 *
 * @apiSuccess {Boolean} success Deletion success status
 * @apiSuccess {String} message Confirmation message
 *
 * @apiError {String} NotFound Grade not found
 * @apiError {String} ValidationError Invalid ID parameter
 * @apiError {String} ServerError Internal server error
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const validated = paramsSchema.parse(req.params);

    const success = await gradeDelete(validated.id);

    if (!success) {
      res.status(404).json(errorResponse('Grade not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse({ message: 'Grade deleted successfully' }));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Invalid ID parameter', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
