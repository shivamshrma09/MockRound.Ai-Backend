import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  content: string;
  userId: string;
  name: string;
  email?: string;
  createdAt: Date;
}

const feedbackSchema = new Schema<IFeedback>({
  content: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);
