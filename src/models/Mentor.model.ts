import mongoose, { Document, Schema } from 'mongoose';

interface BookedSlot {
  date?: string; 
  timeSlot: string; 
  isBooked: boolean;
  bookedBy?: string; 
  bookedByName?: string;
  bookedByEmail?: string;
  bookingDate?: Date;
}

interface DaySchedule {
  day: string; 
  timeSlots: string[]; 
  bookedSlots: BookedSlot[]; 
}

export interface IMentor extends Document {
  name: string;
  email: string;
  phone: string;
  expertise: string[];
  experience: number;
  bio: string;
  profileImage?: string;
  rating: number;
  totalSessions: number;
  pricePerHour: number;
  availability: DaySchedule[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bookedSlotSchema = new Schema({
  date: { type: String, required: false }, 
  timeSlot: { type: String, required: true },
  isBooked: { type: Boolean, default: true },
  bookedBy: { type: String, required: true },
  bookedByName: { type: String, required: true },
  bookedByEmail: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now }
});

const dayScheduleSchema = new Schema({
  day: { 
    type: String, 
    required: true,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  },
  timeSlots: [{ 
    type: String, 
    required: true 
  }], 
  bookedSlots: [bookedSlotSchema] 
});

const mentorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  expertise: [{ type: String, required: true }],
  experience: { type: Number, required: true },
  bio: { type: String, required: true },
  profileImage: { type: String, default: 'https://via.placeholder.com/150' },
  rating: { type: Number, default: 0 },
  totalSessions: { type: Number, default: 0 },
  pricePerHour: { type: Number, required: true },
  availability: [dayScheduleSchema],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const MentorModel = mongoose.model<IMentor>('Mentor', mentorSchema);
