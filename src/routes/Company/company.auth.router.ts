import express from 'express';
import { body } from 'express-validator';
import { sendOTP, register, login } from '../../controllers/comapany/company.auth.controller';
import { verifyCompanyOTP } from '../../controllers/comapany/otp.controller';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const router = express.Router();


router.post('/send-otp', [
  body('companyEmail').isEmail().withMessage('Valid email required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  handleValidationErrors
], sendOTP);


router.post('/register', [
  body('companyEmail').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  handleValidationErrors
], register);


router.post('/verify-otp', [
  body('companyEmail').isEmail().withMessage('Valid email required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  handleValidationErrors
], verifyCompanyOTP);


router.post('/login', [
  body('companyEmail').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
], login);

export default router;
