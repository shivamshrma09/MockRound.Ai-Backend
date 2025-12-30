import express from 'express';
import { body } from 'express-validator';
import { createFeedback, getAllFeedback } from '../../controllers/User/feedback.controller';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const router = express.Router();

router.post('/feedback', [
  body('content').notEmpty().withMessage('Content is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  handleValidationErrors
], createFeedback);

router.get('/feedback', getAllFeedback);

export default router;
