import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
  try {
    console.log(`📧 Attempting to send email via SendGrid to: ${to}`);
    
    const msg = {
      to: to,
      from: 'shivamsharma27107@gmail.com',
      subject: subject,
      html: html,
    };

    await sgMail.send(msg);
    console.log(`✅ Email sent successfully via SendGrid to: ${to}`);
    return true;
  } catch (error) {
    console.error(`❌ SendGrid error:`, error);
    return false;
  }
}