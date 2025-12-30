import mongoose, { Schema, Document } from 'mongoose';


const behaviourSchema = new Schema({
  eyeMovement: { type: String, trim: true },
  confidenceLevel: { type: String, trim: true },
  otherIndicators: { type: String, trim: true }
}, { _id: false });


const suspiciousActivitySchema = new Schema({
  isSuspicious: { type: Boolean, default: false },
  details: { type: String, trim: true },
  evidence: [{
    type: { type: String, enum: ['image', 'video', 'text'], required: true },
    url: { type: String, required: true, trim: true }
  }]
}, { _id: false });


const questionsSchema = new Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  feedback: {
    text: { type: String, trim: true },
    score: { type: Number, min: 0, max: 5 },
    sentiment: { type: String, enum: ['positive', 'negative', 'neutral'] },
    actionItems: [{ type: String, trim: true }]
  },
  behaviour: [behaviourSchema]
}, { _id: false });


const candidateDataSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: Number, min: 0 },
  resume: { type: String, trim: true },
  dateOfAttempted: { type: Date, default: Date.now },
  overallScore: { type: Number, min: 0, max: 5 },
  selected: { type: Boolean, default: false },
  analysis: [{ type: Schema.Types.ObjectId, ref: 'Analysis' }]
}, { _id: false });


const analysisSchema = new Schema({
  cadidate_questions: [questionsSchema],
  suspiciousActivity: [suspiciousActivitySchema],
  overall: {
    score: { type: Number, min: 0, max: 5 },
    weaknesses: { type: String, trim: true },
    strengths: { type: String, trim: true },
    improvement: { type: String, trim: true },
    roadmap: { type: String, trim: true },
    confidenceLevel: { type: String, trim: true }
  },
  attachments: [{ type: String, trim: true }],
  timestamp: { type: Date, default: Date.now, index: true },
  aiInsights: { type: String, trim: true }
}, { _id: false });



const questions_compny = new Schema({
    question: { type: String, required: true, trim: true },
    acceptedAnswers: [{ type: String, required: true, trim: true }],
    difficultyLevel: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
}, { _id: false });


const dataSchema = new Schema({
  questions: [questions_compny],
  totalQuestions: { type: Number, min: 0 },
  candidatesAnalysis: [analysisSchema]
}, { _id: false });


const allInterviewsSchema = new Schema({
  totalCandidates: { type: Number, min: 0 },
  roundType: { type: String, trim: true },
  scheduleDate: { type: Date },
  emailSend: { type: Date },
  name: { type: String, trim: true },
  role: { type: String, trim: true },
  data: [dataSchema]
}, { _id: false });


const companySchema = new Schema({
  companyName: { type: String, required: true, unique: true, trim: true },
  companyLogo: { type: String, trim: true },
  companyWebsite: { type: String, trim: true },
  companyEmail: { type: String, trim: true },
  password:{type:String,required:true},
  companyPhone: { type: String, trim: true },
  companyAddress: { type: String, trim: true },
  balance: { type: Number, default: 0, min: 0 },
  isPaid: { type: Boolean, default: false },
  allInterviews: [allInterviewsSchema]
}, { timestamps: true });



export interface ICompany extends Document {
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  companyEmail?: string;
  password: string;
  companyPhone?: string;
  companyAddress?: string;
  balance: number;
  isPaid: boolean;
  allInterviews: any[];
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken(): string;
}


companySchema.statics.hashPassword = async function(password: string) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.hash(password, 12);
};

companySchema.statics.comparePassword = async function(password: string, hashedPassword: string) {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(password, hashedPassword);
};

companySchema.methods.generateAuthToken = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { userId: this._id, email: this.companyEmail, type: 'company' },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '7d' }
  );
};

interface ICompanyModel extends mongoose.Model<ICompany> {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export const CompanyModel = mongoose.model<ICompany, ICompanyModel>('Company', companySchema);
