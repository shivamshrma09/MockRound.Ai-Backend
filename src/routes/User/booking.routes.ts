import express from 'express';
import { body, param } from 'express-validator';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const router = express.Router();


router.post('/bookings', [
  body('mentorId').notEmpty().withMessage('Mentor ID is required'),
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('duration').isNumeric().withMessage('Duration must be number'),
  body('preferredDate').notEmpty().withMessage('Preferred date is required'),
  body('preferredTime').notEmpty().withMessage('Preferred time is required'),
  body('topics').isArray().withMessage('Topics must be array'),
  body('sessionType').notEmpty().withMessage('Session type is required'),
  handleValidationErrors
], async (req, res) => {
  try {
    const booking = {
      id: Date.now().toString(),
      ...req.body,
      status: 'pending',
      createdAt: new Date()
    };
    
    res.json({ success: true, message: 'Booking created successfully', booking });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/bookings', async (req, res) => {
  try {
    const bookings = []; 
    res.json({ success: true, bookings });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
