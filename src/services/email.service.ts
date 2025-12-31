import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createThankYouEmail = (userName: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 40px; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto;">
        <h1>Thank You for Your Feedback!</h1>
        <p>Dear <strong>${userName}</strong>,</p>
        <p>Thank you for taking the time to share your feedback with us!</p>
        <p>© 2025 MockRound.AI | All Rights Reserved</p>
    </div>
</body>
</html>
  `;
};

export const sendThankYouEmail = async (userEmail: string, userName: string): Promise<boolean> => {
  try {
    const htmlContent = createThankYouEmail(userName);
    
    const msg = {
      to: userEmail,
      from: 'shivamsharma27107@gmail.com',
      subject: 'Thank You for Your Feedback - MockRound.AI',
      html: htmlContent,
    };

    await sgMail.send(msg);
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
      
      const msg = {
        to: user.email,
        from: 'shivamsharma27107@gmail.com',
        subject: 'Thank You for Your Feedback - MockRound.AI',
        html: htmlContent,
      };

      await sgMail.send(msg);
      successCount++;
    } catch (error) {
      console.error(`Failed to send thank you email to ${user.email}:`, error);
      failedCount++;
    }
  }

  return { success: successCount, failed: failedCount };
};