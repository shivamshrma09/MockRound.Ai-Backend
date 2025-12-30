import { Request, Response } from 'express';
import { CompanyModel } from '../../models/Company.model';
import { OtpModel } from '../../models/Otp.model';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../../services/sendemail.services';

function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}
export const sendOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { companyEmail, companyName } = req.body;
    const userExists = await CompanyModel.findOne({ companyEmail });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists with this email" });
    }
    
    const otp = generateOTP();
    await OtpModel.deleteOne({ email: companyEmail });
    await OtpModel.create({ email: companyEmail, otp });
    

    const otpHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="margin: 0; padding: 40px; font-family: Arial, sans-serif;">
    <div style="display: flex; flex-direction: column; margin-left: 100px; max-width: 600px; align-items: center;">
        
        <img src="https://ik.imagekit.io/qwzhnpeqg/generated-image.png"
             alt="MockRound.AI Logo" 
             style="width: 170px; display: block; margin: 0 auto 20px;">
        
        <div style="text-align: center; margin-bottom: 20px;">
            <p style="color: #333; font-size: 16px; margin: 0 0 10px 0;">welcome to MockRound.AI <b style="color: #000;">${companyName || 'User'}</b></p>
        </div>
        
        <div style="width: 300px; min-height: auto; border: 1px solid #333; display: flex; flex-direction: column; padding: 20px; border-radius: 8px;">
            <p style="color: #555; margin-bottom: 20px; font-size: 14px;">Here is your GitHub sudo authentication code:</p>
            
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
                <a href="https://x.com/Vsion09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/in/shivam-kumar-321810324/" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/shivamshrma09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://medium.com/@vsion09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-medium"></i>
                </a>
                <a href="https://www.youtube.com/@shivamsharmadev" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>

        </div>

    </div>
</body>
</html>
    `;
    
    const emailSent = await sendEmail(companyEmail, 'MockRound.AI - Account Verification', otpHtml);
    
    if (emailSent) {
      return res.status(200).json({ 
        success: true, 
        message: "OTP sent successfully to your email"
      });
    } else {
      return res.status(200).json({ 
        success: true, 
        message: "OTP generated (check console - email service unavailable)",
        otp: otp
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
}


export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { companyEmail, password, companyName } = req.body;
    
    const userExists = await CompanyModel.findOne({ companyEmail });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    const hashedPassword = await CompanyModel.hashPassword(password);
    const user = await CompanyModel.create({
      companyName,
      companyEmail,
      password: hashedPassword
    });
    
    const token = user.generateAuthToken();
    

const welcomeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="margin: 0; padding: 40px; font-family: Arial, sans-serif;">
    <div style="display: flex; flex-direction: column; margin-left: 100px; max-width: 600px; align-items: center;">
        
        <!-- Logo -->
        <img src="https://ik.imagekit.io/qwzhnpeqg/generated-image.png" alt="MockRound.AI Logo" style="width: 170px; display: block; margin: 0 auto 20px;">
        
        <!-- Outside Text -->
        <div style="text-align: center; margin-bottom: 20px;">
            <p style="color: #333; font-size: 16px; margin: 0 0 10px 0;">Welcome to MockRound.AI <b style="color: #000;">${companyName}</b></p>
        </div>
        
        <!-- Main Box -->
        <div style="width: 300px; min-height: auto; border: 1px solid #333; display: flex; flex-direction: column; padding: 20px; border-radius: 8px;">
            
            <p style="color: #555; margin-bottom: 15px; font-size: 14px;">You have successfully registered.</p>
            
            <!-- Message Box -->
            <div style="background: #6f6c6c; border-radius: 6px; padding: 15px; text-align: center; margin-bottom: 15px; display: flex; align-items: center; justify-content: center;">
                <p style="color: white; font-size: 16px; font-weight: bold; margin: 0;">Start exploring and learning today!</p>
            </div>
            
            <!-- Quick Tips -->
            <p style="color: #999; font-size: 11px; margin: 0 0 10px 0; line-height: 1.4;">
                <strong>Quick Tips:</strong><br>
                • Complete your profile for better interview prep<br>
                • Practice daily to improve your technical skills<br>
                • Join our community and connect with peers
            </p>
            
            <!-- Quote -->
            <p style="color: #aaa; font-size: 10px; margin: 0 0 15px 0; font-style: italic; line-height: 1.4;">
                "The best way to predict the future is to invent it." - Alan Kay<br>
                Master coding & electrical engineering with MockRound.AI
            </p>

            <!-- Social Links -->
            <div style="display: flex; justify-content: center; gap: 12px; margin-top: 10px; border-top: 1px solid #555; padding-top: 12px;">
                <a href="https://x.com/Vsion09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/in/shivam-kumar-321810324/" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/shivamshrma09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://medium.com/@vsion09" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-medium"></i>
                </a>
                <a href="https://www.youtube.com/@shivamsharmadev" target="_blank" rel="noopener noreferrer" style="color: #999; text-decoration: none; font-size: 14px; transition: color 0.3s;">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>

        </div>

    </div>
</body>
</html>
`;
    
    await sendEmail(companyEmail, 'Welcome to MockRound.AI', welcomeHtml);
    
    return res.status(201).json({ 
      success: true,
      token, 
      user, 
      message: "Registration successful" 
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed" });
  }
}


export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { companyEmail, password } = req.body;
    
    const user = await CompanyModel.findOne({ companyEmail });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
    const isValidPassword = await CompanyModel.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
    const token = user.generateAuthToken();
    
    return res.status(200).json({ 
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        companyEmail: user.companyEmail,
        companyName: user.companyName
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
}


