import { Request, Response } from 'express';
import { MentorModel } from '../../models/Mentor.model';

export const createMentor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, phone, expertise, experience, bio, pricePerHour, availability } = req.body;
    
    const mentor = new MentorModel({
      name,
      email,
      phone,
      expertise,
      experience,
      bio,
      pricePerHour,
      availability
    });
    
    await mentor.save();
    return res.status(201).json({ success: true, mentor });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllMentors = async (req: Request, res: Response): Promise<Response> => {
  try {
    const mentors = await MentorModel.find({ isActive: true });
    return res.status(200).json({ success: true, mentors });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMentor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const mentor = await MentorModel.findById(id);
    
    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }
    
    return res.status(200).json({ success: true, mentor });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};




export const getAvailableSlots = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, day, date } = req.params; 
    const mentor = await MentorModel.findById(id);
    
    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }
    
    const daySchedule = mentor.availability.find(schedule => schedule.day.toLowerCase() === day.toLowerCase());
    
    if (!daySchedule) {
      return res.status(404).json({ 
        success: false, 
        message: `No availability found for ${day}`,
        availableSlots: []
      });
    }
    
    const bookedTimeSlots = daySchedule.bookedSlots
      ?.filter(slot => !slot.date || slot.date === date)
      ?.map(slot => slot.timeSlot) || [];
    
    const availableSlots = daySchedule.timeSlots.filter(slot => !bookedTimeSlots.includes(slot));
    
    return res.status(200).json({ 
      success: true, 
      day,
      date,
      availableSlots
    });
    
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const bookSlot = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, day, date, timeSlot } = req.params;
    const { userId, userName, userEmail } = req.body;
    
    const mentor = await MentorModel.findById(id);
    
    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }
    
    const daySchedule = mentor.availability.find(schedule => schedule.day.toLowerCase() === day.toLowerCase());
    
    if (!daySchedule) {
      return res.status(404).json({ success: false, message: `No availability found for ${day}` });
    }
    
    if (!daySchedule.timeSlots.includes(timeSlot)) {
      return res.status(400).json({ success: false, message: 'Invalid time slot' });
    }
    
    const alreadyBooked = daySchedule.bookedSlots?.some(slot => 
      slot.timeSlot === timeSlot && (!slot.date || slot.date === date)
    );
    if (alreadyBooked) {
      return res.status(400).json({ success: false, message: 'Time slot already booked for this date' });
    }
    
    if (!daySchedule.bookedSlots) {
      daySchedule.bookedSlots = [];
    }
    
    daySchedule.bookedSlots.push({
      date,
      timeSlot,
      isBooked: true,
      bookedBy: userId,
      bookedByName: userName,
      bookedByEmail: userEmail,
      bookingDate: new Date()
    });
    
    await mentor.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Slot booked successfully',
      booking: {
        mentorName: mentor.name,
        day,
        date,
        timeSlot,
        bookedBy: userName,
        bookingDate: new Date()
      }
    });
    
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
