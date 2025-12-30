import { Request, Response } from 'express';
import { UserModel } from '../../models/User.model';
import { sendEmail } from '../../services/sendemail.services';

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

const createReport = (data: TechnicalRoundPayload) => {
  let report = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="margin: 0; padding: 40px; font-family: Arial, sans-serif;">
    <div style="display: flex; flex-direction: column; margin-left: 100px; max-width: 700px; align-items: center;">
        
        <img src="https://ik.imagekit.io/qwzhnpeqg/generated-image.png" alt="MockRound.AI Logo" style="width: 170px; display: block; margin: 0 auto 20px;">
        
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000; font-size: 28px; margin: 0 0 10px 0;">Interview Report</h1>
            <p style="color: #666; font-size: 14px; margin: 0;">Detailed Assessment & Performance Analysis</p>
        </div>
        
        <div style="width: 100%; border: 1px solid #333; display: flex; flex-direction: column; padding: 25px; border-radius: 8px;">
            
            <h2 style="color: #000; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #d97757; padding-bottom: 10px;">Candidate Information</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;"><strong>Name:</strong> ${data.candidateName}</p>
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;"><strong>Email:</strong> ${data.candidateEmail}</p>
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;"><strong>Company:</strong> ${data.company_Name}</p>
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;"><strong>Role:</strong> ${data.role}</p>
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;"><strong>Round Type:</strong> ${data.roundType}</p>
            </div>

            <div style="background: #6f6c6c; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
                <div style="flex: 1;">
                    <p style="color: #ccc; font-size: 12px; margin: 0 0 5px 0;">Total Score</p>
                    <p style="color: white; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: 2px;">${data.totalScore}/100</p>
                </div>
                <div style="border-left: 1px solid #888; height: 50px;"></div>
                <div style="flex: 1; text-align: right;">
                    <p style="color: #ccc; font-size: 12px; margin: 0 0 5px 0;">Interview Date</p>
                    <p style="color: white; font-size: 14px; font-weight: bold; margin: 0;">${new Date(data.timestamp).toLocaleDateString()}</p>
                </div>
            </div>

            <h2 style="color: #000; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #d97757; padding-bottom: 10px;">Questions & Answers</h2>
`;

  data.interviewData.forEach((item, index) => {
    report += `
    <div style="border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 6px; background: #fafafa;">
        <h3 style="color: #000; font-size: 14px; margin: 0 0 10px 0; padding-bottom: 8px; border-bottom: 1px solid #d97757;">Question ${index + 1}</h3>
        
        <p style="color: #333; font-size: 12px; margin: 0 0 8px 0;">
            <strong>Question:</strong> ${item.question}
        </p>
        
        <p style="color: #555; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
            <strong>Answer:</strong> ${item.answer}
        </p>
        
        <p style="color: #555; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
            <strong>Feedback:</strong> ${item.feedback}
        </p>
        
        <div style="background: #6f6c6c; padding: 8px 12px; border-radius: 4px; margin: 8px 0; text-align: center;">
            <p style="color: white; font-size: 12px; font-weight: bold; margin: 0;">Score: <span style="font-size: 14px; letter-spacing: 1px;">${item.score}/10</span></p>
        </div>
        
        <p style="color: #666; font-size: 11px; margin: 8px 0 0 0;">
            <strong>Topics:</strong> ${item.topics.join(', ')}
        </p>
    </div>
    `;
  });

  report += `
            <h2 style="color: #000; font-size: 16px; margin: 20px 0 12px 0; border-bottom: 2px solid #d97757; padding-bottom: 8px;">Performance Summary</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #333; font-size: 12px; margin: 0 0 8px 0;"><strong>Overall Rating:</strong> <span style="color: #d97757; font-weight: bold;">${data.totalScore >= 80 ? 'Excellent' : data.totalScore >= 60 ? 'Good' : 'Needs Improvement'}</span></p>
                <p style="color: #333; font-size: 12px; margin: 0 0 8px 0;"><strong>Total Questions Attempted:</strong> ${data.interviewData.length}</p>
                <p style="color: #333; font-size: 12px; margin: 0 0 8px 0;"><strong>Average Score Per Question:</strong> ${(data.totalScore / data.interviewData.length).toFixed(1)}/10</p>
                <p style="color: #555; font-size: 11px; margin: 0;">Keep practicing and improving your skills for better performance in future rounds.</p>
            </div>

            <p style="color: #999; font-size: 11px; margin: 0 0 15px 0; line-height: 1.4;">
                This report is confidential and intended for the candidate and recruiting team only.<br>
                For any queries, contact support@mockround.ai
            </p>

            <div style="display: flex; justify-content: center; gap: 12px; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 12px;">
                <a href="https://x.com/Vsion09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/in/shivam-kumar-321810324/" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/shivamshrma09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://medium.com/@vsion09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-medium"></i>
                </a>
                <a href="https://www.youtube.com/@shivamsharmadev" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>

        </div>

    </div>
</body>
</html>
  `;

  return report;
};

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
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const record = {
            company_Name,
            role,
            candidateName,
            candidateEmail,
            roundType,
            totalScore,
            timestamp: new Date(timestamp),
            interviewData,
            resume,
            htmlReport: '',
            emailSent: false
        };

        user.aiGeneratedInterviews.push(record);
        
        if (resume) {
            user.resume = JSON.stringify(resume);
        }
        
        await user.save();

        const report = createReport({
            company_Name,
            role,
            candidateName,
            candidateEmail,
            interviewData,
            totalScore,
            roundType,
            timestamp,
            resume
        });

        const emailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="margin: 0; padding: 40px; font-family: Arial, sans-serif; background: #f5f5f5;">
    <div style="display: flex; flex-direction: column; margin-left: 100px; max-width: 700px; align-items: center;">
        
        <img src="https://ik.imagekit.io/qwzhnpeqg/generated-image.png" alt="MockRound.AI Logo" style="width: 170px; display: block; margin: 0 auto 20px;">
        
        <div style="width: 100%; border: 1px solid #333; display: flex; flex-direction: column; padding: 25px; border-radius: 8px; background: white;">
            
            <h2 style="color: #000; font-size: 22px; margin: 0 0 10px 0; text-align: center;">Interview Completed!</h2>
            <p style="color: #666; font-size: 14px; margin: 0 0 20px 0; text-align: center;">Dear <strong>${candidateName}</strong>,</p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;">Your <strong>${roundType}</strong> round for <strong>${role}</strong> position at <strong>${company_Name}</strong> has been completed.</p>
                <p style="color: #333; font-size: 13px; margin: 0;">We have evaluated your performance and generated a detailed report with feedback on each question.</p>
            </div>
            <div style="background: #6f6c6c; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 20px;">
                <p style="color: #ccc; font-size: 12px; margin: 0 0 5px 0;">Your Total Score</p>
                <p style="color: white; font-size: 40px; font-weight: bold; margin: 0; letter-spacing: 3px;">${totalScore}/100</p>
                <p style="color: #aaa; font-size: 12px; margin: 8px 0 0 0;">${totalScore >= 80 ? '🎉 Excellent Performance!' : totalScore >= 60 ? '👍 Good Effort!' : '💪 Keep Practicing!'}</p>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <div style="flex: 1; background: #f9f9f9; padding: 12px; border-radius: 6px; text-align: center;">
                    <p style="color: #999; font-size: 11px; margin: 0 0 5px 0;">Questions</p>
                    <p style="color: #000; font-size: 16px; font-weight: bold; margin: 0;">${interviewData.length}</p>
                </div>
                <div style="flex: 1; background: #f9f9f9; padding: 12px; border-radius: 6px; text-align: center;">
                    <p style="color: #999; font-size: 11px; margin: 0 0 5px 0;">Avg Score</p>
                    <p style="color: #d97757; font-size: 16px; font-weight: bold; margin: 0;">${(totalScore / interviewData.length).toFixed(1)}/10</p>
                </div>
                <div style="flex: 1; background: #f9f9f9; padding: 12px; border-radius: 6px; text-align: center;">
                    <p style="color: #999; font-size: 11px; margin: 0 0 5px 0;">Date</p>
                    <p style="color: #000; font-size: 13px; font-weight: bold; margin: 0;">${new Date(timestamp).toLocaleDateString()}</p>
                </div>
            </div>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #000; font-size: 14px; margin: 0 0 10px 0; border-bottom: 1px solid #d97757; padding-bottom: 8px;">Report Includes:</h3>
                <ul style="color: #555; font-size: 12px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Detailed feedback on each question</li>
                    <li>Individual scores with performance insights</li>
                    <li>Topics covered and areas of strength</li>
                    <li>Recommendations for improvement</li>
                </ul>
            </div>

            <div style="background: #d97757; border-radius: 6px; padding: 15px; text-align: center; margin-bottom: 20px;">
                <p style="color: white; font-size: 13px; font-weight: bold; margin: 0 0 8px 0;">Full Report Attached</p>
                <p style="color: #f5f5f5; font-size: 11px; margin: 0;">Please check your attached file for the complete detailed assessment</p>
            </div>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #000; font-size: 13px; margin: 0 0 8px 0;"><strong>Next Steps:</strong></h3>
                <p style="color: #666; font-size: 12px; margin: 0; line-height: 1.6;">
                    Review the detailed feedback carefully. Identify areas where you can improve and practice those specific topics. Our platform offers additional resources and practice questions to help you prepare for the next round.
                </p>
            </div>

            <p style="color: #999; font-size: 11px; margin: 0 0 15px 0; text-align: center; line-height: 1.4;">
                This report is confidential and intended for the candidate and recruiting team only.<br>
                For any queries or concerns, contact <strong>support@mockround.ai</strong>
            </p>

            <div style="display: flex; justify-content: center; gap: 12px; border-top: 1px solid #ddd; padding-top: 12px;">
                <a href="https://x.com/Vsion09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/in/shivam-kumar-321810324/" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/shivamshrma09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://medium.com/@vsion09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-medium"></i>
                </a>
                <a href="https://www.youtube.com/@shivamsharmadev" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px;">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>

            <p style="color: #aaa; font-size: 10px; margin: 15px 0 0 0; text-align: center;">
                © 2025 MockRound.AI | All Rights Reserved
            </p>

        </div>

    </div>
</body>
</html>
        `;

        user.aiGeneratedInterviews[user.aiGeneratedInterviews.length - 1].htmlReport = report;
        
        let emailSent = false;
        const subject = `Interview Results - ${company_Name} | ${role} Position`;
        
        try {
            const result = await sendEmail(candidateEmail, subject, emailContent);
            emailSent = result === true;
        } catch (e) {
            console.error('Email send error:', e);
            emailSent = false;
        }
        
        const emailRecord = {
            emailType: 'ai-interview-results',
            subject,
            htmlContent: emailContent,
            recipientEmail: candidateEmail,
            sentAt: new Date(),
            status: emailSent ? 'sent' : 'failed',
            relatedData: {
                company_Name,
                role,
                roundType,
                totalScore,
                interviewId: user.aiGeneratedInterviews[user.aiGeneratedInterviews.length - 1]._id
            }
        };
        
        user.emailHistory.push(emailRecord);
        user.aiGeneratedInterviews[user.aiGeneratedInterviews.length - 1].emailSent = emailSent;
        await user.save();

        return res.status(201).json({
            success: true,
            message: emailSent ? 'Interview submitted and email sent successfully' : 'Interview submitted but email failed to send',
            data: {
                interviewId: user.aiGeneratedInterviews[user.aiGeneratedInterviews.length - 1]._id,
                totalScore,
                company_Name,
                role,
                candidateName,
                emailSent,
                timestamp: new Date(timestamp)
            }
        });
    } catch (error) {
        console.error('Submit interview error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to submit interview',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
