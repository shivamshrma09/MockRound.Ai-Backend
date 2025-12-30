import { Request, Response } from 'express';
import axios from 'axios';
import { UserModel } from '../../models/User.model';
import { sendEmail } from '../../services/sendemail.services';
import { saveTechnicalRoundAnalysis } from '../../services/technicalround.services';

const createCodeAnalysisEmail = (userName: string, averageScore: string, totalSubmissions: number, resultsHtml: string) => {
  return `
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
            <h1 style="color: #000; font-size: 28px; margin: 0 0 10px 0;">Code Analysis Report</h1>
            <p style="color: #666; font-size: 14px; margin: 0;">Your Detailed Code Review & Feedback</p>
        </div>
        
        <div style="width: 100%; border: 1px solid #333; display: flex; flex-direction: column; padding: 25px; border-radius: 8px;">
            
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0; text-align: center;">
                Hello <strong>${userName}</strong>! 
            </p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;">Your code analysis is complete! We've reviewed all your submissions and provided detailed feedback on each one.</p>
                <p style="color: #666; font-size: 12px; margin: 0;">Use these insights to improve your coding skills and prepare better for interviews.</p>
            </div>

            <h2 style="color: #000; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #d97757; padding-bottom: 10px;">Analysis Summary</h2>
            
            <div style="background: #6f6c6c; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
                <div style="flex: 1;">
                    <p style="color: #ccc; font-size: 12px; margin: 0 0 5px 0;">Average Score</p>
                    <p style="color: white; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: 2px;">${averageScore}</p>
                </div>
                <div style="border-left: 1px solid #888; height: 50px;"></div>
                <div style="flex: 1; text-align: right;">
                    <p style="color: #ccc; font-size: 12px; margin: 0 0 5px 0;">Submissions</p>
                    <p style="color: white; font-size: 28px; font-weight: bold; margin: 0;">${totalSubmissions}</p>
                </div>
            </div>

            <h2 style="color: #000; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #d97757; padding-bottom: 10px;">Detailed Analysis</h2>
            
            ${resultsHtml}

            <h2 style="color: #000; font-size: 16px; margin: 20px 0 12px 0; border-bottom: 2px solid #d97757; padding-bottom: 8px;">Key Recommendations</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <ul style="color: #555; font-size: 12px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Review the feedback provided for each submission carefully</li>
                    <li>Focus on the areas marked as "Needs Improvement"</li>
                    <li>Practice similar problems to strengthen weak areas</li>
                    <li>Implement the recommended optimizations in your code</li>
                    <li>Re-submit improved versions of your solutions</li>
                </ul>
            </div>

            <div style="background: #d97757; border-radius: 6px; padding: 15px; text-align: center; margin-bottom: 20px;">
                <p style="color: white; font-size: 13px; font-weight: bold; margin: 0 0 5px 0;">Continue Improving</p>
                <p style="color: #f5f5f5; font-size: 11px; margin: 0;">Log in to MockRound.AI to upload more code for analysis and track your progress over time</p>
            </div>

            <p style="color: #999; font-size: 11px; margin: 0 0 15px 0; text-align: center; line-height: 1.4;">
                Keep practicing and refining your coding skills. Great progress takes consistent effort!<br>
                For any questions, contact <strong>support@mockround.ai</strong>
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
};

const buildReport = (data: any) => {
    let report = ``;

    if (data.results && Array.isArray(data.results)) {
        data.results.forEach((item: any, index: number) => {
            report += `
    <div style="border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 6px; background: #fafafa;">
        <h3 style="color: #000; font-size: 14px; margin: 0 0 10px 0; padding-bottom: 8px; border-bottom: 1px solid #d97757;">Submission ${index + 1}: ${item.question_title || 'Code Analysis'}</h3>
        
        <p style="color: #333; font-size: 12px; margin: 0 0 8px 0;">
            <strong>Overall Score:</strong> ${item.overall_score}/100
        </p>
        
        <p style="color: #555; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
            <strong>Feedback:</strong> ${item.feedback}
        </p>
        
        <p style="color: #555; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
            <strong>Detailed Analysis:</strong> ${item.analysis}
        </p>
        
        <div style="background: #f9f9f9; padding: 10px; border-radius: 4px; margin: 8px 0;">
            <p style="color: #666; font-size: 11px; margin: 0;">
                <strong>Recommendations:</strong><br>
                ${item.recommendations && Array.isArray(item.recommendations) 
                    ? item.recommendations.map((rec: string) => `• ${rec}`).join('<br>')
                    : 'No specific recommendations'
                }
            </p>
        </div>
    </div>
            `;
        });
    }
    return report;
};

const processAnalysis = async (submissions: any[], userId: string, reportIndex: number) => {
    try {
        const response = await axios.post(
            process.env.AI_ANALYSIS_API_URL,
            { submissions },
            { 
                headers: { 'Content-Type': 'application/json' }, 
                timeout: parseInt(process.env.API_TIMEOUT || '120000')
            }
        );
        
        const user = await UserModel.findById(userId);
        if (!user) return;

        const report = buildReport(response.data);

        user.codeAnalysisReports[reportIndex] = {
            ...user.codeAnalysisReports[reportIndex],
            analysis: response.data,
            htmlReport: report,
            status: 'completed'
        };
        
        const emailHtml = createCodeAnalysisEmail(
            user.name,
            response.data.average_score || 'N/A',
            submissions.length,
            report
        );
        
        let emailSent = false;
        try {
            const result = await sendEmail(
                user.email,
                process.env.EMAIL_SUBJECT_PREFIX + 'Code Analysis Report' || 'MockRound.AI - Code Analysis Report',
                emailHtml
            );
            emailSent = result === true;
        } catch (e) {
            emailSent = false;
        }
        
        const emailRecord = {
            emailType: 'code-analysis',
            subject: process.env.EMAIL_SUBJECT_PREFIX + 'Code Analysis Report' || 'MockRound.AI - Code Analysis Report',
            htmlContent: emailHtml,
            recipientEmail: user.email,
            sentAt: new Date(),
            status: emailSent ? 'sent' : 'failed',
            relatedData: {
                totalSubmissions: submissions.length,
                averageScore: response.data.average_score,
                analysisId: user.codeAnalysisReports[reportIndex]._id
            }
        };
        
        user.emailHistory.push(emailRecord);
        await user.save();
        
    } catch (error) {
        console.error('Analysis processing error:', error);
    }
};

export const batch_code_analysis = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { submissions, userId } = req.body;
        
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.codeAnalysisReports.push({
            timestamp: new Date(),
            submissions,
            status: 'processing',
            requestData: { submissions, userId }
        });
        await user.save();

        const reportIndex = user.codeAnalysisReports.length - 1;
        processAnalysis(submissions, userId, reportIndex);

        return res.status(202).json({
            success: true,
            message: 'Code analysis started! You will receive the report via email shortly.',
            status: 'processing',
            reportId: user.codeAnalysisReports[reportIndex]._id
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Failed to start code analysis',
            error: error.message
        });
    }
};

export const technicalroundanalysis = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { companyName, role, date, score, questions, userId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const result = await saveTechnicalRoundAnalysis(userId, {
            companyName,
            role,
            date,
            score,
            questions
        });

        if (!result.success) {
            return res.status(result.message === 'User not found' ? 404 : 500).json({
                success: false,
                message: result.message,
                error: result.error
            });
        }

        return res.status(201).json({
            success: true,
            message: result.message,
            data: result.data
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Technical round analysis failed',
            error: error.message
        });
    }
};
