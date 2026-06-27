import { Request, Response } from 'express';
import { UserModel } from '../../models/User.model';
import { sendEmail } from '../../services/sendemail.services';
import { interviewReportEmail } from '../../utils/emailTemplate';

interface InterviewData {
  question: string;
  answer: string;
  feedback: string;
  score: number;
  topics: string[];
  timestamp: string;
}

interface TechnicalRoundPayload {
  company_Name: string;
  role: string;
  candidateName: string;
  candidateEmail: string;
  interviewData: InterviewData[];
  totalScore: number;
  roundType: string;
  timestamp: string;
  resume: any;
}

const buildQuestionsHtml = (interviewData: InterviewData[]): string =>
  interviewData.map((item, index) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:8px;margin-bottom:12px;">
      <tr><td style="padding:14px 20px;border-bottom:1px solid #f9f9f9;">
        <p style="color:#D97757;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0;font-family:Arial,sans-serif;">Q${index + 1}</p>
        <p style="color:#111827;font-size:13px;font-weight:600;margin:0;font-family:Arial,sans-serif;">${item.question}</p>
      </td></tr>
      <tr><td style="padding:14px 20px;border-bottom:1px solid #f9f9f9;">
        <p style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0;font-family:Arial,sans-serif;">Your Answer</p>
        <p style="color:#374151;font-size:12px;margin:0;line-height:1.6;font-family:Arial,sans-serif;">${item.answer}</p>
      </td></tr>
      <tr><td style="padding:14px 20px;border-bottom:1px solid #f9f9f9;">
        <p style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0;font-family:Arial,sans-serif;">Feedback</p>
        <p style="color:#374151;font-size:12px;margin:0;line-height:1.6;font-family:Arial,sans-serif;">${item.feedback}</p>
      </td></tr>
      <tr><td style="padding:10px 20px;">
        <p style="color:#D97757;font-size:12px;font-weight:700;margin:0;font-family:Arial,sans-serif;">Score: ${item.score}/10 &nbsp;·&nbsp; Topics: ${item.topics?.join(', ') || 'N/A'}</p>
      </td></tr>
    </table>`).join('');

export const submitInterview = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            company_Name,
            role,
            candidateName,
            candidateEmail,
            interviewData,
            totalScore,
            roundType,
            timestamp,
            resume
        }: TechnicalRoundPayload = req.body;

        const user = await UserModel.findOne({ email: candidateEmail });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const questionsHtml = buildQuestionsHtml(interviewData);
        const emailContent = interviewReportEmail(
            candidateName,
            company_Name,
            role,
            roundType,
            totalScore,
            interviewData.length,
            new Date(timestamp).toLocaleDateString(),
            questionsHtml
        );

        const record = {
            company_Name, role, candidateName, candidateEmail,
            roundType, totalScore,
            timestamp: new Date(timestamp),
            interviewData, resume,
            htmlReport: emailContent,
            emailSent: false
        };

        user.aiGeneratedInterviews.push(record);
        if (resume) user.resume = JSON.stringify(resume);
        await user.save();

        const subject = `Interview Results - ${company_Name} | ${role}`;
        let emailSent = false;

        try {
            const result = await sendEmail(candidateEmail, subject, emailContent);
            emailSent = result === true;
        } catch (e) {
            console.error('Email send error:', e);
        }

        const lastIdx = user.aiGeneratedInterviews.length - 1;
        user.emailHistory.push({
            emailType: 'ai-interview-results',
            subject,
            htmlContent: emailContent,
            recipientEmail: candidateEmail,
            sentAt: new Date(),
            status: emailSent ? 'sent' : 'failed',
            relatedData: { company_Name, role, roundType, totalScore }
        });
        user.aiGeneratedInterviews[lastIdx].emailSent = emailSent;
        await user.save();

        return res.status(201).json({
            success: true,
            message: emailSent ? 'Interview submitted and email sent' : 'Interview submitted but email failed',
            data: {
                interviewId: user.aiGeneratedInterviews[lastIdx]._id,
                totalScore, company_Name, role, candidateName,
                emailSent, timestamp: new Date(timestamp)
            }
        });
    } catch (error: any) {
        console.error('Submit interview error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to submit interview',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
