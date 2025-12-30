import express from 'express';
import { body, param } from 'express-validator';
import { 
  createMentor, 
  getAllMentors, 
  getMentor,
  getAvailableSlots,
  bookSlot
} from '../../controllers/User/mentor.controller';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const router = express.Router();


router.post('/mentors', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('expertise').isArray().withMessage('Expertise must be array'),
  body('experience').isNumeric().withMessage('Experience must be number'),
  body('bio').notEmpty().withMessage('Bio is required'),
  body('pricePerHour').isNumeric().withMessage('Price must be number'),
  body('availability').isArray().withMessage('Availability must be array'),
  handleValidationErrors
], createMentor);


router.get('/mentors', getAllMentors);


router.get('/mentors/:id', [
  param('id').isMongoId().withMessage('Invalid mentor ID'),
  handleValidationErrors
], getMentor);


router.get('/mentors/:id/slots/:day/:date', [
  param('id').isMongoId().withMessage('Invalid mentor ID'),
  param('day').notEmpty().withMessage('Day is required'),
  param('date').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be in YYYY-MM-DD format'),
  handleValidationErrors
], getAvailableSlots);


router.post('/mentors/:id/book/:day/:date/:timeSlot', [
  param('id').isMongoId().withMessage('Invalid mentor ID'),
  param('day').notEmpty().withMessage('Day is required'),
  param('date').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be in YYYY-MM-DD format'),
  param('timeSlot').notEmpty().withMessage('Time slot is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('userName').notEmpty().withMessage('User name is required'),
  body('userEmail').isEmail().withMessage('Valid user email is required'),
  handleValidationErrors
], bookSlot);

export default router;
