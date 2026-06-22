import sgMail from '@sendgrid/mail';

export const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
  try {
    const sendGridKey = process.env.SENDGRID_API_KEY;
    if (!sendGridKey) {
      console.warn(`Email skipped for ${to} because SENDGRID_API_KEY is not configured.`);
      return false;
    }

    sgMail.setApiKey(sendGridKey);

    const msg = {
      to,
      from: process.env.SENDER_EMAIL!,
      subject,
      html,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error(`SendGrid error:`, error);
    return false;
  }
};
