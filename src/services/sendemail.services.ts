import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
  try {
    console.log(`📧 Attempting to send email via Resend to: ${to}`);
    
    const { data, error } = await resend.emails.send({
      from: 'MockRound.AI <noreply@mockround.ai>',
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error(`❌ Resend error:`, error);
      return false;
    }

    console.log(`✅ Email sent successfully via Resend to: ${to}`, data?.id);
    return true;
  } catch (error) {
    console.error(`❌ Email failed to: ${to}`, error);
    return false;
  }
}
