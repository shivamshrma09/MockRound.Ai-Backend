import sgMail from '@sendgrid/mail';
import { thankYouEmail } from '../utils/emailTemplate';

const initSendGrid = () => {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) {
    console.warn('SENDGRID_API_KEY is not set.');
    return false;
  }
  sgMail.setApiKey(key);
  return true;
};

export const sendThankYouEmail = async (userEmail: string, userName: string): Promise<boolean> => {
  if (!initSendGrid()) return false;
  try {
    await sgMail.send({
      to: userEmail,
      from: process.env.SENDER_EMAIL!,
      subject: 'Thank You for Your Feedback - MockRound.AI',
      html: thankYouEmail(userName),
    });
    return true;
  } catch (error) {
    console.error('Thank you email error:', error);
    return false;
  }
};

export const sendBulkThankYouEmails = async (users: Array<{ email: string; name: string }>): Promise<{ success: number; failed: number }> => {
  if (!initSendGrid()) return { success: 0, failed: users.length };
  let successCount = 0;
  let failedCount = 0;

  for (const user of users) {
    try {
      await sgMail.send({
        to: user.email,
        from: process.env.SENDER_EMAIL!,
        subject: 'Thank You for Your Feedback - MockRound.AI',
        html: thankYouEmail(user.name),
      });
      successCount++;
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
      failedCount++;
    }
  }

  return { success: successCount, failed: failedCount };
};
