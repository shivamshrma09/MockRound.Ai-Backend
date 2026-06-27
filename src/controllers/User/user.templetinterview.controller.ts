import { Request, Response } from 'express';
import axios from 'axios';
import { UserModel } from '../../models/User.model';
import { sendEmail } from '../../services/sendemail.services';
import { saveTechnicalRoundAnalysis } from '../../services/technicalround.services';
import { codeAnalysisEmail } from '../../utils/emailTemplate';

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
        user.markModified('codeAnalysisReports');
        
        const emailHtml = codeAnalysisEmail(
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
