/**
 * @summary
 * Internal API routes configuration for V1
 * Handles authenticated endpoint routing
 *
 * @module routes/v1/internalRoutes
 */

import { Router } from 'express';
import * as gradeController from '@/api/v1/internal/grade/controller';

const router = Router();

// Grade routes - /api/v1/internal/grade
router.get('/grade', gradeController.listHandler);
router.post('/grade', gradeController.createHandler);
router.get('/grade/:id', gradeController.getHandler);
router.put('/grade/:id', gradeController.updateHandler);
router.delete('/grade/:id', gradeController.deleteHandler);

export default router;
