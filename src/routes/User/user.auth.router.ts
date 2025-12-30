import express from 'express';
import { body } from 'express-validator';
import { sendOTP, register, sendLoginOTP, verifyLoginOTP } from '../../controllers/User/user.auth.controller';
import { verifyOTP } from '../../controllers/User/otp.controller';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const router = express.Router();


router.post('/send-otp', [
  body('email').isEmail().withMessage('Valid email required'),
  body('name').notEmpty().withMessage('Name is required'),
  handleValidationErrors
], sendOTP);


router.post('/register', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  handleValidationErrors
], register);


router.post('/verify-otp', [
  body('email').isEmail().withMessage('Valid email required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  handleValidationErrors
], verifyOTP);


router.post('/send-login-otp', [
  body('email').isEmail().withMessage('Valid email required'),
  handleValidationErrors
], sendLoginOTP);


router.post('/verify-login-otp', [
  body('email').isEmail().withMessage('Valid email required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  handleValidationErrors
], verifyLoginOTP);

export default router;
