import mongoose, { Schema, Document } from 'mongoose';




const EmailReportSchema = new Schema({
  emailType: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  htmlContent: { type: String, required: true },
  recipientEmail: { type: String, required: true, trim: true },
  sentAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['sent', 'failed'], required: true }
}, { _id: false });


const CandidateReportSchema = new Schema({
  candidateID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidateEmail: { type: String, required: true, trim: true },
  score: { type: Number, min: 0, max: 100 },
  status: { type: String, enum: ['passed', 'failed', 'pending'], default: 'pending' },
  emailReports: [EmailReportSchema]
}, { _id: false });


const RoundDataSchema = new Schema({
  roundName: { type: String, required: true, trim: true },
  roundNumber: { type: Number, required: true },
  totalCandidates: { type: Number, default: 0 },
  passedCandidates: { type: Number, default: 0 },
  passedCandidateIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reports: [CandidateReportSchema]
}, { _id: false });


const CandidateDetailsSchema = new Schema({
  candidateID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidateName: { type: String, required: true, trim: true },
  candidateEmail: { type: String, required: true, trim: true },
  dateOfEnrollment: { type: Date, default: Date.now, index: true },
  resume: { type: String, trim: true },
  status: { type: String, enum: ['enrolled', 'active', 'completed', 'disqualified'], default: 'enrolled' }
}, { _id: false });


const RoundDetailsSchema = new Schema({
  roundName: { type: String, required: true, trim: true },
  roundNumber: { type: Number, required: true },
  startDate: { type: Date, required: true, index: true },
  endDate: { type: Date, required: true, index: true },
  resultDate: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  description: { type: String, trim: true },
  type: { type: String, enum: ['online', 'offline'], default: 'online' },
  duration: { type: String, trim: true },
  location: { type: String, trim: true }
}, { _id: false });
 

const SuspiciousActivitySchema = new Schema({
  title: { type: String, required: true, trim: true },
  img: { type: String, trim: true },
  video: { type: String, trim: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });


const QuestionsSchema = new Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  feedback: { type: String, trim: true  },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });


const StudentsSchema = new Schema({
  candidateName: { type: String, trim: true },
  candidateEmail: { type: String, trim: true },
  candidateID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [QuestionsSchema],
  suspiciousActivity: [SuspiciousActivitySchema]
}, { _id: false });




const RawDataSchema = new Schema({
  roundNumber: { type: Number, required: true },
  roundName: { type: String, required: true, trim: true },
  students: [StudentsSchema]
}, { _id: false });


const ChallengeSchema = new Schema({
  challengeId:{ type: String, unique: true, index: true, default: () => new mongoose.Types.ObjectId().toString() },
  challengeName: { type: String, required: true, trim: true, index: true },
  company_Name: { type: String, required: true, trim: true, index: true },
  role: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: { type: String, enum: ['draft', 'active', 'completed', 'cancelled'], default: 'draft' },
  
  
  roundDetails: [RoundDetailsSchema],
  
  
  candidateDetails: [CandidateDetailsSchema],
  
  
  roundData: [RoundDataSchema],
  
  
  rawData: [RawDataSchema],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });



export interface IChallenge extends Document {
  challengeName: string;
  company_Name: string;
  role: string;
  description?: string;
  status: string;
  roundDetails: any[];
  candidateDetails: any[];
  roundData: any[];
  rawData: any[];
  prizes?: string[];
  eligibility?: string[];
  submissionRules?: string[];
  contactInfo?: {
    website?: string;
    email?: string;
    phone?: string;
  };
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ChallengeModel = mongoose.model<IChallenge>('Challenge', ChallengeSchema);
