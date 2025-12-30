import express from 'express';
import { body } from 'express-validator';
import { submitInterview } from '../../controllers/User/ai.generated.interview.controller';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const router = express.Router();

router.post('/technicalroundsubmit', [
  body('company_Name').notEmpty().withMessage('Company name is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('candidateName').notEmpty().withMessage('Candidate name is required'),
  body('candidateEmail').isEmail().withMessage('Valid candidate email is required'),
  body('roundType').notEmpty().withMessage('Round type is required'),
  body('totalScore').isNumeric().withMessage('Total score must be a number'),
  body('timestamp').isISO8601().withMessage('Valid timestamp is required'),
  body('interviewData').isArray().withMessage('Interview data must be an array'),
  handleValidationErrors
], submitInterview);

export default router;
