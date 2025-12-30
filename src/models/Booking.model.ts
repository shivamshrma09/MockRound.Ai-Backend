import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  mentorId: string;
  studentId: string;
  day: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bookingDate: Date;
  sessionDetails?: {
    title?: string;
    description?: string;
    topics?: string[];
    sessionType?: string;
  };
}

const BookingSchema = new Schema<IBooking>({
  mentorId: { type: String, required: true },
  studentId: { type: String, required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'confirmed'
  },
  bookingDate: { type: Date, default: Date.now },
  sessionDetails: {
    title: String,
    description: String,
    topics: [String],
    sessionType: String
  }
}, {
  timestamps: true
});

export const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);
