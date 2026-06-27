const LOGO = 'https://ik.imagekit.io/qwzhnpeqg/mockround.ai%20imges%20public/logo2.png';
const ACCENT = '#D97757';
const BORDER = 'rgba(0,0,0,0.12)';

const esc = (str: string): string =>
  String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const footer = `
<tr>
  <td style="padding:20px 40px 28px;border-top:1px solid ${BORDER};text-align:center;">
    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr>
        <td style="padding:0 8px;"><a href="https://x.com/Vsion09" style="color:#9ca3af;text-decoration:none;font-size:12px;font-family:Arial,sans-serif;">Twitter</a></td>
        <td style="color:#d1d5db;font-size:12px;">·</td>
        <td style="padding:0 8px;"><a href="https://www.linkedin.com/in/shivam-kumar-321810324/" style="color:#9ca3af;text-decoration:none;font-size:12px;font-family:Arial,sans-serif;">LinkedIn</a></td>
        <td style="color:#d1d5db;font-size:12px;">·</td>
        <td style="padding:0 8px;"><a href="https://github.com/shivamshrma09" style="color:#9ca3af;text-decoration:none;font-size:12px;font-family:Arial,sans-serif;">GitHub</a></td>
        <td style="color:#d1d5db;font-size:12px;">·</td>
        <td style="padding:0 8px;"><a href="https://www.youtube.com/@shivamsharmadev" style="color:#9ca3af;text-decoration:none;font-size:12px;font-family:Arial,sans-serif;">YouTube</a></td>
      </tr>
    </table>
    <p style="color:#9ca3af;font-size:11px;margin:10px 0 0 0;font-family:Arial,sans-serif;">© 2025 MockRound.AI · All Rights Reserved</p>
  </td>
</tr>`;

const wrap = (body: string) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid ${BORDER};overflow:hidden;">
        <tr>
          <td align="center" style="padding:28px 40px 22px;border-bottom:1px solid ${BORDER};">
            <img src="${LOGO}" alt="MockRound.AI" style="height:30px;display:block;"/>
          </td>
        </tr>
        ${body}
        ${footer}
      </table>
    </td></tr>
  </table>
</body>
</html>`;

/* ─── OTP Email (login + signup) ─── */
export const otpEmail = (name: string, otp: string, heading: string, subtext: string): string =>
  wrap(`
  <tr><td style="padding:36px 40px 28px;">
    <p style="color:#111827;font-size:20px;font-weight:700;margin:0 0 6px 0;font-family:Arial,sans-serif;">${heading}, ${name} 👋</p>
    <p style="color:#6b7280;font-size:13px;margin:0 0 28px 0;font-family:Arial,sans-serif;">${subtext}</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="background:#fff8f5;border:1.5px solid ${ACCENT};border-radius:10px;padding:28px 20px;">
          <p style="color:${ACCENT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px 0;font-family:Arial,sans-serif;">Your Verification Code</p>
          <p style="color:#111827;font-size:38px;font-weight:800;letter-spacing:12px;margin:0;font-family:Arial,sans-serif;">${otp}</p>
        </td>
      </tr>
    </table>

    <p style="color:#9ca3af;font-size:12px;margin:20px 0 0 0;line-height:1.7;font-family:Arial,sans-serif;">
      Valid for <strong style="color:#6b7280;">10 minutes</strong> · One-time use only.<br/>
      If you didn't request this, please ignore this email.
    </p>
  </td></tr>`);

/* ─── Welcome Email ─── */
export const welcomeEmail = (name: string): string =>
  wrap(`
  <tr><td style="padding:36px 40px 28px;">
    <p style="color:#111827;font-size:20px;font-weight:700;margin:0 0 6px 0;font-family:Arial,sans-serif;">Welcome to MockRound.AI, ${name}! 🎉</p>
    <p style="color:#6b7280;font-size:13px;margin:0 0 24px 0;font-family:Arial,sans-serif;">Your account is ready. Start preparing for your dream job today.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;margin-bottom:24px;">
      <tr><td style="padding:14px 20px;border-bottom:1px solid #f3f4f6;">
        <p style="color:#111827;font-size:13px;font-weight:600;margin:0 0 2px 0;font-family:Arial,sans-serif;">🤖 AI Mock Interviews</p>
        <p style="color:#6b7280;font-size:12px;margin:0;font-family:Arial,sans-serif;">Practice with intelligent AI interviewers anytime</p>
      </td></tr>
      <tr><td style="padding:14px 20px;border-bottom:1px solid #f3f4f6;">
        <p style="color:#111827;font-size:13px;font-weight:600;margin:0 0 2px 0;font-family:Arial,sans-serif;">💻 Coding Challenges</p>
        <p style="color:#6b7280;font-size:12px;margin:0;font-family:Arial,sans-serif;">Real company problems with live code execution</p>
      </td></tr>
      <tr><td style="padding:14px 20px;">
        <p style="color:#111827;font-size:13px;font-weight:600;margin:0 0 2px 0;font-family:Arial,sans-serif;">📊 Detailed Feedback</p>
        <p style="color:#6b7280;font-size:12px;margin:0;font-family:Arial,sans-serif;">Comprehensive analysis after every session</p>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="background:${ACCENT};border-radius:8px;padding:14px;">
        <p style="color:#ffffff;font-size:13px;font-weight:700;margin:0;font-family:Arial,sans-serif;">Log in and start practicing →</p>
      </td></tr>
    </table>
  </td></tr>`);

/* ─── Enrollment Email ─── */
export const enrollmentEmail = (name: string, challengeName: string, company: string, role: string, totalRounds: number): string =>
  wrap(`
  <tr><td style="padding:36px 40px 28px;">
    <p style="color:#111827;font-size:20px;font-weight:700;margin:0 0 4px 0;font-family:Arial,sans-serif;">Enrollment Confirmed! 🎉</p>
    <p style="color:#6b7280;font-size:13px;margin:0 0 24px 0;font-family:Arial,sans-serif;">Hey ${name}, you're all set to compete.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;margin-bottom:24px;">
      <tr><td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;">
        <p style="color:#9ca3af;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin:0 0 2px 0;font-family:Arial,sans-serif;">Challenge</p>
        <p style="color:#111827;font-size:14px;font-weight:700;margin:0;font-family:Arial,sans-serif;">${challengeName}</p>
      </td></tr>
      <tr><td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;">
        <p style="color:#9ca3af;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin:0 0 2px 0;font-family:Arial,sans-serif;">Company</p>
        <p style="color:#111827;font-size:14px;font-weight:700;margin:0;font-family:Arial,sans-serif;">${company}</p>
      </td></tr>
      <tr><td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;">
        <p style="color:#9ca3af;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin:0 0 2px 0;font-family:Arial,sans-serif;">Role</p>
        <p style="color:#111827;font-size:14px;font-weight:700;margin:0;font-family:Arial,sans-serif;">${role}</p>
      </td></tr>
      <tr><td style="padding:13px 20px;">
        <p style="color:#9ca3af;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin:0 0 2px 0;font-family:Arial,sans-serif;">Total Rounds</p>
        <p style="color:#111827;font-size:14px;font-weight:700;margin:0;font-family:Arial,sans-serif;">${totalRounds}</p>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="background:${ACCENT};border-radius:8px;padding:14px;">
        <p style="color:#ffffff;font-size:13px;font-weight:700;margin:0;font-family:Arial,sans-serif;">Log in to MockRound.AI to view your challenge →</p>
      </td></tr>
    </table>
  </td></tr>`);

/* ─── Interview Report Email ─── */
export const interviewReportEmail = (
  name: string, company: string, role: string,
  roundType: string, totalScore: number,
  questionsCount: number, date: string,
  questionsHtml: string
): string =>
  wrap(`
  <tr><td style="padding:36px 40px 12px;">
    <p style="color:#111827;font-size:20px;font-weight:700;margin:0 0 4px 0;font-family:Arial,sans-serif;">Interview Report</p>
    <p style="color:#6b7280;font-size:13px;margin:0 0 24px 0;font-family:Arial,sans-serif;">${company} · ${role} · ${roundType}</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8f5;border:1.5px solid ${ACCENT};border-radius:10px;margin-bottom:24px;">
      <tr>
        <td align="center" style="padding:18px 0;border-right:1px solid #fde8dc;">
          <p style="color:#9ca3af;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin:0 0 4px 0;font-family:Arial,sans-serif;">Score</p>
          <p style="color:#111827;font-size:32px;font-weight:800;margin:0;font-family:Arial,sans-serif;">${totalScore}<span style="font-size:14px;color:#6b7280;">/100</span></p>
          <p style="color:${ACCENT};font-size:11px;font-weight:600;margin:3px 0 0 0;font-family:Arial,sans-serif;">${totalScore >= 80 ? '🎉 Excellent!' : totalScore >= 60 ? '👍 Good Effort!' : '💪 Keep Practicing!'}</p>
        </td>
        <td align="center" style="padding:18px 0;border-right:1px solid #fde8dc;">
          <p style="color:#9ca3af;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin:0 0 4px 0;font-family:Arial,sans-serif;">Questions</p>
          <p style="color:#111827;font-size:28px;font-weight:800;margin:0;font-family:Arial,sans-serif;">${questionsCount}</p>
        </td>
        <td align="center" style="padding:18px 0;">
          <p style="color:#9ca3af;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin:0 0 4px 0;font-family:Arial,sans-serif;">Date</p>
          <p style="color:#111827;font-size:13px;font-weight:700;margin:0;font-family:Arial,sans-serif;">${date}</p>
        </td>
      </tr>
    </table>

    <p style="color:#111827;font-size:13px;font-weight:700;margin:0 0 12px 0;padding-bottom:8px;border-bottom:2px solid ${ACCENT};font-family:Arial,sans-serif;">Questions & Answers</p>
    ${questionsHtml}
  </td></tr>`);

/* ─── Code Analysis Email ─── */
export const codeAnalysisEmail = (name: string, avgScore: string, totalSubmissions: number, resultsHtml: string): string =>
  wrap(`
  <tr><td style="padding:36px 40px 12px;">
    <p style="color:#111827;font-size:20px;font-weight:700;margin:0 0 4px 0;font-family:Arial,sans-serif;">Code Analysis Report</p>
    <p style="color:#6b7280;font-size:13px;margin:0 0 24px 0;font-family:Arial,sans-serif;">Hi ${name}, your detailed code review is ready.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8f5;border:1.5px solid ${ACCENT};border-radius:10px;margin-bottom:24px;">
      <tr>
        <td align="center" style="padding:18px 0;border-right:1px solid #fde8dc;">
          <p style="color:#9ca3af;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin:0 0 4px 0;font-family:Arial,sans-serif;">Avg Score</p>
          <p style="color:#111827;font-size:32px;font-weight:800;margin:0;font-family:Arial,sans-serif;">${avgScore}</p>
        </td>
        <td align="center" style="padding:18px 0;">
          <p style="color:#9ca3af;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin:0 0 4px 0;font-family:Arial,sans-serif;">Submissions</p>
          <p style="color:#111827;font-size:32px;font-weight:800;margin:0;font-family:Arial,sans-serif;">${totalSubmissions}</p>
        </td>
      </tr>
    </table>

    <p style="color:#111827;font-size:13px;font-weight:700;margin:0 0 12px 0;padding-bottom:8px;border-bottom:2px solid ${ACCENT};font-family:Arial,sans-serif;">Detailed Analysis</p>
    ${resultsHtml}
  </td></tr>`);

/* ─── Thank You Email ─── */
export const thankYouEmail = (name: string): string =>
  wrap(`
  <tr><td style="padding:36px 40px 28px;">
    <p style="color:#111827;font-size:20px;font-weight:700;margin:0 0 6px 0;font-family:Arial,sans-serif;">Thank you, ${name}! 🙏</p>
    <p style="color:#6b7280;font-size:13px;margin:0 0 24px 0;font-family:Arial,sans-serif;">We appreciate you taking the time to share your feedback.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8f5;border:1.5px solid ${ACCENT};border-radius:10px;margin-bottom:24px;">
      <tr><td align="center" style="padding:24px 28px;">
        <p style="color:#4b5563;font-size:13px;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
          Your feedback helps us build a better interview preparation experience.<br/>
          We carefully review every response to improve MockRound.AI for everyone.
        </p>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="background:${ACCENT};border-radius:8px;padding:14px;">
        <p style="color:#ffffff;font-size:13px;font-weight:700;margin:0;font-family:Arial,sans-serif;">Keep practicing — your dream job is closer than you think 🚀</p>
      </td></tr>
    </table>
  </td></tr>`);
