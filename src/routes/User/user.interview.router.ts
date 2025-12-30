import express from 'express';
import { body } from 'express-validator';
import { batch_code_analysis , technicalroundanalysis} from '../../controllers/User/user.templetinterview.controller';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const router = express.Router();


router.post('/batch-analysis', [
  body('submissions').isArray().withMessage('Submissions must be an array'),
  body('submissions').notEmpty().withMessage('Submissions array cannot be empty'),
  body('submissions.*.question').notEmpty().withMessage('Question is required'),
  body('submissions.*.user_code').notEmpty().withMessage('User code is required'),
  body('submissions.*.correct_solution').optional(),
  body('userId').notEmpty().withMessage('User ID is required'),
  handleValidationErrors
], batch_code_analysis);


router.post('/technical-round-analysis', [
  body('companyName').notEmpty().withMessage('Company name cannot be empty'),
  body('role').notEmpty().withMessage('Role cannot be empty'),
  body('date').notEmpty().withMessage('Date cannot be empty'),
  body('score').isNumeric().withMessage('Score must be a number'),
  body('userId').notEmpty().withMessage('User ID cannot be empty'),
  body('questions').isArray().withMessage('Questions must be an array'),
  body('questions.*.question').notEmpty().withMessage('Question text is required'),
  body('questions.*.answer').notEmpty().withMessage('Answer is required'),
  body('questions.*.isright').isBoolean().withMessage('isright must be boolean'),
  body('questions.*.rightanswer').notEmpty().withMessage('Right answer is required'),
  handleValidationErrors
], technicalroundanalysis);

export default router;
