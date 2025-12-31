import { Request, Response } from 'express';
import { UserModel } from '../../models/User.model';
import { OtpModel } from '../../models/Otp.model';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../../services/sendemail.services';

function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}





const createOTPEmail = (name: string, otp: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="margin: 0; padding: 40px; font-family: Arial, sans-serif;">
    <div style="display: flex; flex-direction: row; margin-left: 100px; max-width: 600px; align-items: center;">
        
        <img src="https://ik.imagekit.io/qwzhnpeqg/mockround.ai%20imges%20public/generated-image.png" alt="MockRound.AI Logo" style="width: 170px; display: block; margin: 0 auto 20px;">
        
        <div style="text-align: center; margin-bottom: 20px;">
            <p style="color: #333; font-size: 16px; margin: 0 0 10px 0;">Please verify your identity, <b style="color: #000;">${name}</b></p>
        </div>
        
        <div style="width: 300px; min-height: auto; border: 1px solid #333; display: flex; flex-direction: row; padding: 20px; border-radius: 8px;">
            <p style="color: #555; margin-bottom: 20px; font-size: 14px;">Here is your MockRound.AI authentication code:</p>
            
            <div style="background: #6f6c6c; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 15px; display: flex; align-items: center; justify-content: center;">
                <p style="color: white; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 2px;">${otp}</p>
            </div>
            
            <p style="color: #999; font-size: 11px; margin: 0 0 15px 0; line-height: 1.4;">
                This code is valid for <strong>10 minutes</strong> and can only be used once.<br>
                Please don't share this code with anyone: we'll never ask for it on the phone or via email.
            </p>
            
            <p style="color: #aaa; font-size: 11px; margin: 0 0 15px 0;">
                Thanks,<br><strong>The MockRound.AI Team</strong>
            </p>

            <div style="display: flex; justify-content: center; gap: 12px; margin-top: 10px; border-top: 1px solid #555; padding-top: 12px;">
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

        </div>

    </div>
</body>
</html>
  `;
};



const createWelcomeEmail = (name: string) => {
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
            <h1 style="color: #000; font-size: 28px; margin: 0 0 10px 0;">Welcome to MockRound.AI</h1>
            <p style="color: #666; font-size: 14px; margin: 0;">Get Ready to Ace Your Interviews</p>
        </div>
        
        <div style="width: 100%; border: 1px solid #333; display: flex; flex-direction: column; padding: 25px; border-radius: 8px;">
            
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0; text-align: center;">
                Welcome <strong>${name}</strong>! 🎉
            </p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;">You have successfully registered with MockRound.AI.</p>
                <p style="color: #666; font-size: 12px; margin: 0;">Start your interview preparation journey and boost your confidence!</p>
            </div>

            <h2 style="color: #000; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #d97757; padding-bottom: 10px;">What You Can Do Now</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <ul style="color: #555; font-size: 12px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Complete your profile with your resume and skills</li>
                    <li>Explore available coding challenges and contests</li>
                    <li>Practice technical interviews with AI guidance</li>
                    <li>Track your progress and performance metrics</li>
                    <li>Join our community of aspiring developers</li>
                </ul>
            </div>

            <div style="background: #6f6c6c; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 20px;">
                <p style="color: #ccc; font-size: 12px; margin: 0 0 8px 0;">Get Started Today</p>
                <p style="color: white; font-size: 14px; font-weight: bold; margin: 0;">Log in to your account and explore all features</p>
            </div>

            <h2 style="color: #000; font-size: 16px; margin: 0 0 12px 0; border-bottom: 2px solid #d97757; padding-bottom: 8px;">Key Features</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #333; font-size: 12px; margin: 0 0 8px 0;"><strong>AI-Powered Interviews:</strong> <span style="color: #666;">Practice with intelligent AI interviewers</span></p>
                <p style="color: #333; font-size: 12px; margin: 0 0 8px 0;"><strong>Real Interview Simulations:</strong> <span style="color: #666;">Experience realistic interview scenarios</span></p>
                <p style="color: #333; font-size: 12px; margin: 0 0 8px 0;"><strong>Detailed Feedback:</strong> <span style="color: #666;">Get comprehensive analysis of your performance</span></p>
                <p style="color: #333; font-size: 12px; margin: 0;"><strong>Community Support:</strong> <span style="color: #666;">Connect and learn from other candidates</span></p>
            </div>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #000; font-size: 13px; margin: 0 0 8px 0;"><strong>Pro Tips:</strong></h3>
                <ul style="color: #666; font-size: 11px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Update your profile to get personalized recommendations</li>
                    <li>Start with beginner-level challenges to build confidence</li>
                    <li>Review feedback carefully after each interview session</li>
                    <li>Practice regularly to improve your performance</li>
                    <li>Participate in community challenges and contests</li>
                </ul>
            </div>

            <p style="color: #999; font-size: 11px; margin: 0 0 15px 0; text-align: center; line-height: 1.4;">
                If you have any questions or need assistance, feel free to reach out<br>
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

const createLoginOTPEmail = (name: string, otp: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="margin: 0; padding: 40px; font-family: Arial, sans-serif;">
    <div style="display: flex; flex-direction: column; margin-left: 100px; max-width: 600px; align-items: center;">
        
        <img src="https://ik.imagekit.io/qwzhnpeqg/generated-image.png" alt="MockRound.AI Logo" style="width: 170px; display: block; margin: 0 auto 20px;">
        
        <div style="text-align: center; margin-bottom: 20px;">
            <p style="color: #333; font-size: 16px; margin: 0 0 10px 0;">Welcome back, <b style="color: #000;">${name}</b></p>
        </div>
        
        <div style="width: 300px; min-height: auto; border: 1px solid #333; display: flex; flex-direction: column; padding: 20px; border-radius: 8px;">
            <p style="color: #555; margin-bottom: 20px; font-size: 14px;">Here is your login authentication code:</p>
            
            <div style="background: #6f6c6c; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 15px; display: flex; align-items: center; justify-content: center;">
                <p style="color: white; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 2px;">${otp}</p>
            </div>
            
            <p style="color: #999; font-size: 11px; margin: 0 0 15px 0; line-height: 1.4;">
                This code is valid for <strong>10 minutes</strong> and can only be used once.<br>
                Please don't share this code with anyone: we'll never ask for it on the phone or via email.
            </p>
            
            <p style="color: #aaa; font-size: 11px; margin: 0 0 15px 0;">
                Thanks,<br><strong>The MockRound.AI Team</strong>
            </p>

            <div style="display: flex; justify-content: center; gap: 12px; margin-top: 10px; border-top: 1px solid #555; padding-top: 12px;">
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

        </div>

    </div>
</body>
</html>
  `;
};

export const sendOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, name } = req.body;
    
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists with this email" });
    }
    
    const otp = generateOTP();
    await OtpModel.deleteOne({ email });
    await OtpModel.create({ email, otp });
    
    console.log(`📧 Sending OTP to: ${email}, OTP: ${otp}`);
    
    // Send email async
    const otpHtml = createOTPEmail(name || 'User', otp);
    sendEmail(email, process.env.EMAIL_SUBJECT_PREFIX + 'Account Verification' || 'MockRound.AI - Account Verification', otpHtml)
      .then(() => console.log(`✅ Email sent successfully to: ${email}`))
      .catch(err => console.error(`❌ Email failed to: ${email}`, err));
    
    return res.status(200).json({ 
      success: true, 
      message: "OTP sent successfully to your email",
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    console.error('❌ SendOTP Error:', error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, name } = req.body;
    
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    const hashedPassword = await UserModel.hashPassword(password);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword
    });
    
    const token = user.generateAuthToken();
    
    // Send welcome email async
    const welcomeHtml = createWelcomeEmail(name);
    sendEmail(email, process.env.EMAIL_SUBJECT_PREFIX + 'Welcome to MockRound.AI' || 'Welcome to MockRound.AI', welcomeHtml)
      .catch(err => console.error('Welcome email error:', err));
    
    return res.status(201).json({ 
      success: true,
      token, 
      user, 
      message: "Registration successful" 
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const sendLoginOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email'
      });
    }

    const otp = generateOTP();

    await OtpModel.deleteOne({ email });
    await OtpModel.create({ email, otp });

    console.log(`📧 Sending Login OTP to: ${email}, OTP: ${otp}`);

    const emailHtml = createLoginOTPEmail(user.name, otp);
    sendEmail(email, process.env.EMAIL_SUBJECT_PREFIX + 'Login OTP' || 'Login OTP - MockRound.AI', emailHtml)
      .then(() => console.log(`✅ Login OTP sent successfully to: ${email}`))
      .catch(err => console.error(`❌ Login OTP failed to: ${email}`, err));

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });

  } catch (error: any) {
    console.error('❌ SendLoginOTP Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const verifyLoginOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    const otpRecord = await OtpModel.findOne({ email });
    
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or expired'
      });
    }

    if (otpRecord.otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    const otpAge = Date.now() - otpRecord.createdAt.getTime();
    
    if (otpAge > 10 * 60 * 1000) {
      await OtpModel.deleteOne({ email });
      return res.status(400).json({
        success: false,
        message: 'OTP expired'
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const token = user.generateAuthToken();
    await OtpModel.deleteOne({ email });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
