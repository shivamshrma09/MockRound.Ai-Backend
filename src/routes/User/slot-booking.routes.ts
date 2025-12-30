import express from 'express';
import { body } from 'express-validator';
import { MentorModel } from '../../models/Mentor.model';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const router = express.Router();


router.post('/book-slot', [
  body('mentorId').notEmpty().withMessage('Mentor ID is required'),
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('day').notEmpty().withMessage('Day is required'),
  body('startTime').notEmpty().withMessage('Start time is required'),
  body('endTime').notEmpty().withMessage('End time is required'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { mentorId, studentId, day, startTime, endTime } = req.body;
    
    
    const mentor = await MentorModel.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }
    
    
    const daySchedule = mentor.availability.find(schedule => schedule.day === day);
    if (!daySchedule) {
      return res.status(400).json({ success: false, message: 'Mentor not available on this day' });
    }
    
    const timeSlotExists = daySchedule.timeSlots.includes(`${startTime}-${endTime}`);
    if (!timeSlotExists) {
      return res.status(400).json({ success: false, message: 'Time slot not found' });
    }
    
    const existingBooking = daySchedule.bookedSlots.find(slot => slot.timeSlot === `${startTime}-${endTime}`);
    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'Time slot already booked' });
    }
    
    daySchedule.bookedSlots.push({
      timeSlot: `${startTime}-${endTime}`,
      isBooked: true,
      bookedBy: studentId,
      bookedByName: req.body.studentName || 'Unknown',
      bookedByEmail: req.body.studentEmail || 'unknown@email.com',
      bookingDate: new Date()
    });
    
    await mentor.save();
    
    res.json({ 
      success: true, 
      message: 'Time slot booked successfully',
      booking: {
        mentorId,
        studentId,
        day,
        startTime,
        endTime,
        bookedAt: new Date()
      }
    });
    
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/check-availability/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { day } = req.query;
    
    const mentor = await MentorModel.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }
    
    if (day) {
      const daySchedule = mentor.availability.find(schedule => schedule.day === day);
      const availableSlots = daySchedule ? 
        daySchedule.timeSlots.filter(slot => 
          !daySchedule.bookedSlots.some(booked => booked.timeSlot === slot)
        ) : [];
      
      return res.json({ 
        success: true, 
        day,
        availableSlots 
      });
    }
    
    const allAvailableSlots = mentor.availability.map(schedule => ({
      day: schedule.day,
      slots: schedule.timeSlots.filter(slot => 
        !schedule.bookedSlots.some(booked => booked.timeSlot === slot)
      )
    }));
    
    res.json({ 
      success: true, 
      availability: allAvailableSlots 
    });
    
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
