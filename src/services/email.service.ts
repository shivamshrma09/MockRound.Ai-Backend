import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const createThankYouEmail = (userName: string) => {
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
            <h1 style="color: #000; font-size: 28px; margin: 0 0 10px 0;">Thank You for Your Feedback!</h1>
            <p style="color: #666; font-size: 14px; margin: 0;">Your Input Helps Us Improve</p>
        </div>
        
        <div style="width: 100%; border: 1px solid #333; display: flex; flex-direction: column; padding: 25px; border-radius: 8px;">
            
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0; text-align: center;">
                Dear <strong>${userName}</strong>,
            </p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;">Thank you for taking the time to share your feedback with us!</p>
                <p style="color: #666; font-size: 12px; margin: 0;">Your valuable insights help us understand what's working well and where we can improve to better serve you and our community.</p>
            </div>

            <p style="color: #999; font-size: 11px; margin: 0 0 15px 0; text-align: center; line-height: 1.4;">
                If you have any additional feedback or questions, feel free to reach out anytime<br>
                <strong>support@mockround.ai</strong>
            </p>

            <p style="color: #aaa; font-size: 10px; margin: 15px 0 0 0; text-align: center;">
                © 2025 MockRound.AI | All Rights Reserved
            </p>

        </div>

    </div>
</body>
</html>
  `;
};

export const sendThankYouEmail = async (userEmail: string, userName: string): Promise<boolean> => {
  try {
    const htmlContent = createThankYouEmail(userName);
    
    const { data, error } = await resend.emails.send({
      from: 'MockRound.AI <noreply@mockround.ai>',
      to: [userEmail],
      subject: 'Thank You for Your Feedback - MockRound.AI',
      html: htmlContent,
    });

    if (error) {
      console.error('Thank you email send error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Thank you email send error:', error);
    return false;
  }
};

export const sendBulkThankYouEmails = async (users: Array<{ email: string; name: string }>): Promise<{ success: number; failed: number }> => {
  let successCount = 0;
  let failedCount = 0;

  for (const user of users) {
    try {
      const htmlContent = createThankYouEmail(user.name);
      
      const { data, error } = await resend.emails.send({
        from: 'MockRound.AI <noreply@mockround.ai>',
        to: [user.email],
        subject: 'Thank You for Your Feedback - MockRound.AI',
        html: htmlContent,
      });

      if (error) {
        console.error(`Failed to send thank you email to ${user.email}:`, error);
        failedCount++;
      } else {
        successCount++;
      }
    } catch (error) {
      console.error(`Failed to send thank you email to ${user.email}:`, error);
      failedCount++;
    }
  }

  return { success: successCount, failed: failedCount };
};
