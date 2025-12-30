import mongoose, { Schema, Document } from 'mongoose';




const SuspiciousActivitySchema = new Schema({
  isSuspicious: { type: Boolean, default: false },
  details: { type: String, trim: true },
  evidence: [{
    type: { type: String, enum: ['image', 'video', 'text'], required: true },
    url: { type: String, required: true, trim: true }
  }]
}, { _id: false });


const QuestionsSchema = new Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  feedback: {
    text: { type: String, trim: true },
    score: { type: Number, min: 0, max: 5 },
    sentiment: { type: String, enum: ['positive', 'negative', 'neutral'] },
    actionItems: [{ type: String, trim: true }]
  },
  behaviour: {
    eyeMovement: { type: String, trim: true },
    confidenceLevel: { type: String, trim: true },
    otherIndicators: { type: String, trim: true }
  }
}, { _id: false });




const InterviewDataSchema = new Schema({
  questions: [QuestionsSchema],
  suspiciousActivity: [SuspiciousActivitySchema],
  overall: {
    score: { type: Number, min: 0, max: 5 },
    weaknesses: { type: String, trim: true },
    strengths: { type: String, trim: true },
    improvement: { type: String, trim: true },
    roadmap: { type: String, trim: true }
  },
  attachments: [{ type: String, trim: true }],
  timestamp: { type: Date, default: Date.now, index: true },
  aiInsights: { type: String, trim: true },
  codeAnalysisReport: { type: Schema.Types.Mixed }
}, { _id: false });


const AllInterviewsSchema = new Schema({
  interviewName: { type: String, required: true, trim: true, index: true },
  date: { type: Date, required: true, index: true },
  role: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true, index: true },
  type: { type: String, enum: ['technical', 'HR', 'coding', 'system design'], required: true },
  duration: { type: Number, min: 0 },
  tags: [{ type: String, trim: true, index: true }],
  rating: { type: Number, min: 0, max: 5 },
  data: [InterviewDataSchema]
}, { _id: false });


const AIGeneratedInterviewSchema = new Schema({
  company_Name: { type: String, required: true, trim: true, index: true },
  role: { type: String, required: true, trim: true },
  candidateName: { type: String, required: true, trim: true },
  candidateEmail: { type: String, required: true, trim: true },
  roundType: { type: String, required: true, trim: true },
  totalScore: { type: Number, required: true, min: 0, max: 100 },
  timestamp: { type: Date, required: true, index: true },
  interviewData: [{
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    feedback: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0, max: 10 },
    topics: [{ type: String, trim: true }],
    timestamp: { type: String, required: true }
  }],
  resume: { type: Schema.Types.Mixed },
  htmlReport: { type: String, trim: true },
  emailSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });




const TechnicalMCQQuestions = new Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  isright: { type: Boolean, required: true },
  rightanswer: { type: String, required: true, trim: true },
  explainantion: { type: String, trim: true }
}, { _id: false });


const TechnicalMCQRounds = new Schema({
  companyName: { type: String, required: true, trim: true, index: true },
  role: { type: String, required: true, trim: true },
  date: { type: Date, required: true, index: true },
  score: { type: Number, min: 0, max: 100 },
  questions: [TechnicalMCQQuestions]
}, { _id: false });


const HiringChallengeSchema = new Schema({
  chalangeName:{type:String , required: true },
  dateOfenrolment: { type: Date, required: true, index: true },
  resume: { type: String, trim: true },
}, { _id: false });




const EmailHistorySchema = new Schema({
  emailType: { type: String, required: true, trim: true, index: true }, 
  subject: { type: String, required: true, trim: true },
  htmlContent: { type: String, required: true },
  recipientEmail: { type: String, required: true, trim: true },
  sentAt: { type: Date, default: Date.now, index: true },
  status: { type: String, enum: ['sent', 'failed'], required: true },
  relatedData: { type: Schema.Types.Mixed }
}, { _id: false });



const UserSchema = new Schema({
  
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, minlength: 8 },
  avatar: { type: String, trim: true },
  googleId: { type: String, trim: true },
  isVerified: { type: Boolean, default: false },
  authProvider: { type: String, enum: ['email', 'google'], default: 'email' },
  createdAt: { type: Date, default: Date.now },
  
  
  resume: { type: String, trim: true },
  collegeName: { type: String, trim: true },
  yearOfGraduation: { type: Number },
  
  
  isPaid: { type: Boolean, default: false },
  balance: { type: Number, default: 0, min: 0 },
  
  
  totalInterviews: {
    freeInterviews: { type: Number, default: 0, min: 0 },
    paidInterviews: { type: Number, default: 0, min: 0 }
  },
  
  
  allInterviews: [AllInterviewsSchema],
  
  
  aiGeneratedInterviews: [AIGeneratedInterviewSchema],
  
  
  technicalMCQrounds: [TechnicalMCQRounds],
  
  
  hiringChallenge: [HiringChallengeSchema],
  
  
  codeAnalysisReports: [{ type: Schema.Types.Mixed }],
  
  
  emailHistory: [EmailHistorySchema],
  
  
  reports: [{ type: String, trim: true }]
}, { timestamps: true });




UserSchema.pre('save', function (next) {
  if (this.password && this.password.length < 8) {
    next(new Error('Password must be at least 8 characters long.'));
  } else {
    next();
  }
});



export interface IUser extends Document {
  
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  googleId?: string;
  isVerified: boolean;
  authProvider: 'email' | 'google';
  createdAt: Date;
  
  
  resume?: string;
  collegeName?: string;
  yearOfGraduation?: number;
  
  
  isPaid: boolean;
  balance: number;
  
  
  totalInterviews: {
    freeInterviews: number;
    paidInterviews: number;
  };
  
  
  allInterviews: any[]; 
  aiGeneratedInterviews: any[]; 
  technicalMCQrounds: any[]; 
  hiringChallenge: any[]; 
  codeAnalysisReports: any[]; 
  emailHistory: any[]; 
  reports: string[];
  generateAuthToken(): string;
}


UserSchema.statics.hashPassword = async function(password: string) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.hash(password, 12);
};

UserSchema.statics.comparePassword = async function(password: string, hashedPassword: string) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(password, hashedPassword);
};

UserSchema.methods.generateAuthToken = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { userId: this._id, email: this.email, type: 'user' },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '7d' }
  );
};

interface IUserModel extends mongoose.Model<IUser> {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export const UserModel = mongoose.model<IUser, IUserModel>('User', UserSchema);
