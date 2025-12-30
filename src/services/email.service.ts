import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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

            <h2 style="color: #000; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #d97757; padding-bottom: 10px;">What Happens Next?</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <div style="margin-bottom: 12px;">
                    <p style="color: #000; font-size: 12px; font-weight: bold; margin: 0 0 5px 0;">1. Review & Analysis</p>
                    <p style="color: #555; font-size: 11px; margin: 0;">Our team will carefully review your feedback and consider your suggestions</p>
                </div>
                <div style="margin-bottom: 12px; padding-top: 12px; border-top: 1px solid #ddd;">
                    <p style="color: #000; font-size: 12px; font-weight: bold; margin: 0 0 5px 0;">2. Implementation</p>
                    <p style="color: #555; font-size: 11px; margin: 0;">We will work on implementing improvements based on your feedback</p>
                </div>
                <div style="padding-top: 12px; border-top: 1px solid #ddd;">
                    <p style="color: #000; font-size: 12px; font-weight: bold; margin: 0 0 5px 0;">3. Updates & Communication</p>
                    <p style="color: #555; font-size: 11px; margin: 0;">We'll keep you updated on new features and improvements in future releases</p>
                </div>
            </div>

            <div style="background: #d97757; border-radius: 6px; padding: 15px; text-align: center; margin-bottom: 20px;">
                <p style="color: white; font-size: 13px; font-weight: bold; margin: 0 0 5px 0;">We Value Your Support</p>
                <p style="color: #f5f5f5; font-size: 11px; margin: 0;">Your feedback is instrumental in shaping the future of MockRound.AI</p>
            </div>

            <h2 style="color: #000; font-size: 16px; margin: 0 0 12px 0; border-bottom: 2px solid #d97757; padding-bottom: 8px;">Quick Links</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #666; font-size: 12px; margin: 0 0 8px 0;">
                    <strong>Explore More Features:</strong> Log in to your account to discover new tools and resources
                </p>
                <p style="color: #666; font-size: 12px; margin: 0 0 8px 0;">
                    <strong>Join Our Community:</strong> Connect with other users and share your experiences
                </p>
                <p style="color: #666; font-size: 12px; margin: 0;">
                    <strong>Get Support:</strong> Visit our help center or contact support@mockround.ai for any questions
                </p>
            </div>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #000; font-size: 13px; margin: 0 0 8px 0;"><strong>Why Your Feedback Matters:</strong></h3>
                <ul style="color: #666; font-size: 11px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Helps us identify areas for improvement</li>
                    <li>Guides our product development roadmap</li>
                    <li>Ensures we're meeting user needs effectively</li>
                    <li>Drives innovation and better features</li>
                    <li>Makes MockRound.AI better for everyone</li>
                </ul>
            </div>

            <p style="color: #999; font-size: 11px; margin: 0 0 15px 0; text-align: center; line-height: 1.4;">
                If you have any additional feedback or questions, feel free to reach out anytime<br>
                <strong>support@mockround.ai</strong>
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

export const sendThankYouEmail = async (userEmail: string, userName: string): Promise<boolean> => {
  try {
    const htmlContent = createThankYouEmail(userName);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Thank You for Your Feedback - MockRound.AI',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
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
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Thank You for Your Feedback - MockRound.AI',
        html: htmlContent
      };

      await transporter.sendMail(mailOptions);
      successCount++;
    } catch (error) {
      console.error(`Failed to send thank you email to ${user.email}:`, error);
      failedCount++;
    }
  }

  return { success: successCount, failed: failedCount };
};
