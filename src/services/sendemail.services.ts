import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'shivamsharma27107@gmail.com',
      pass: 'crnozdkuquqcrdvt'
    },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000
  });
}

export const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    console.log(`📧 Email config - User: ${process.env.EMAIL_USER}`);
    
    const transporter = createTransporter();
    
    const result = await transporter.sendMail({
      from: 'shivamsharma27107@gmail.com',
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
