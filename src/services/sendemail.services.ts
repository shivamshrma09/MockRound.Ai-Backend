import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

export const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    console.log(`📧 Email config - User: ${process.env.EMAIL_USER}`);
    
    const transporter = createTransporter();
    
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    });
    
    console.log(`✅ Email sent successfully to: ${to}`, result.messageId);
    return true;
  } catch (error) {
    console.error(`❌ Email failed to: ${to}`, error);
    return false;
  }
}
