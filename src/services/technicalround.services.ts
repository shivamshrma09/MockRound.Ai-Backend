import { UserModel } from '../models/User.model';
import { sendEmail } from './sendemail.services';

interface TechnicalRoundData {
  companyName: string;
  role: string;
  date: Date;
  score: number;
  questions: Array<{
    question: string;
    answer: string;
    isright: boolean;
    rightanswer: string;
    explainantion?: string;
  }>;
}


const generateTechnicalRoundReport = (data: TechnicalRoundData): string => {
  const { companyName, role, date, score, questions } = data;
  const correctAnswers = questions.filter((q) => q.isright).length;
  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  let html = `<h1>Technical Round Analysis Report</h1>`;
  html += `<h2>Company: ${companyName}</h2>`;
  html += `<h3>Role: ${role}</h3>`;
  html += `<p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>`;
  html += `<p><strong>Overall Score:</strong> ${score}/100</p>`;
  html += `<p><strong>Questions Answered:</strong> ${correctAnswers}/${totalQuestions} (${percentage}%)</p>`;
  
  html += `<h3>Question-wise Analysis:</h3>`;
  questions.forEach((q, index) => {
    html += `<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">`;
    html += `<h4>Question ${index + 1}: ${q.question}</h4>`;
    html += `<p><strong>Your Answer:</strong> ${q.answer}</p>`;
    html += `<p><strong>Correct Answer:</strong> ${q.rightanswer}</p>`;
    html += `<p><strong>Result:</strong> <span style="color: ${q.isright ? 'green' : 'red'}">${q.isright ? 'Correct' : 'Incorrect'}</span></p>`;
    if (q.explainantion) {
      html += `<p><strong>Explanation:</strong> ${q.explainantion}</p>`;
    }
    html += `</div>`;
  });
  
  return html;
};

export const saveTechnicalRoundAnalysis = async (
  userId: string,
  technicalData: Omit<TechnicalRoundData, 'date'> & { date: string }
): Promise<{
  success: boolean;
  message: string;
  data?: {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
  };
  error?: string;
}> => {
  try {
    
    const user = await UserModel.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    
    const newtechnicalMCQrounds: TechnicalRoundData = {
      companyName: technicalData.companyName,
      role: technicalData.role,
      date: new Date(technicalData.date),
      score: technicalData.score,
      questions: technicalData.questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        isright: q.isright,
        rightanswer: q.rightanswer,
        explainantion: q.explainantion || ''
      })),
    };

    
    user.technicalMCQrounds.push(newtechnicalMCQrounds);
    user.totalInterviews.freeInterviews += 1;
    await user.save();

    
    const htmlReport = generateTechnicalRoundReport(newtechnicalMCQrounds);
    const correctAnswers = technicalData.questions.filter((q) => q.isright).length;
    const percentage = Math.round((correctAnswers / technicalData.questions.length) * 100);
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97757;">MockRound.AI - Technical Round Report</h2>
        <p>Hello ${user.name},</p>
        <p>Your technical round analysis for <strong>${technicalData.companyName}</strong> is complete!</p>
        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="color: #d97757; margin: 0;">Your Performance</h3>
          <p style="font-size: 24px; margin: 10px 0;"><strong>${technicalData.score}/100</strong></p>
          <p style="margin: 5px 0;">Correct Answers: <strong>${correctAnswers}/${technicalData.questions.length}</strong> (${percentage}%)</p>
        </div>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          ${htmlReport}
        </div>
        <p>Keep practicing and improving your skills!</p>
        <p>Best regards,<br>MockRound.AI Team</p>
      </div>
    `;
    
    const emailSubject = `MockRound.AI - Technical Round Report (${technicalData.companyName})`;
    let emailSent = false;
    try {
      const emailResult = await sendEmail(user.email, emailSubject, emailHtml);
      emailSent = emailResult === true;
    } catch (emailError) {
      emailSent = false;
    }
    
    
    const emailRecord = {
      emailType: 'technical-round',
      subject: emailSubject,
      htmlContent: emailHtml,
      recipientEmail: user.email,
      sentAt: new Date(),
      status: emailSent ? 'sent' : 'failed',
      relatedData: {
        companyName: technicalData.companyName,
        role: technicalData.role,
        score: technicalData.score,
        correctAnswers: correctAnswers,
        totalQuestions: technicalData.questions.length,
        percentage: percentage
      }
    };
    
    user.emailHistory.push(emailRecord);
    await user.save();

    return {
      success: true,
      message: 'Technical round analysis saved and report sent via email',
      data: {
        score: technicalData.score,
        totalQuestions: technicalData.questions.length,
        correctAnswers: correctAnswers,
        percentage: percentage
      }
    };

  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to save technical round data',
      error: error.message
    };
  }
};
