import mongoose, { Schema, Document } from 'mongoose';

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
    minlength: [6, 'OTP must be at least 6 characters long']
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export interface IOtp extends Document {
  otp: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export const OtpModel = mongoose.model<IOtp>('Otp', otpSchema);
