import { Request, Response } from 'express';
import { UserModel } from '../../models/User.model';
import { OtpModel } from '../../models/Otp.model';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../../services/sendemail.services';
import { otpEmail, welcomeEmail } from '../../utils/emailTemplate';

function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export const sendOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, name } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: 'User already exists with this email' });
    }

    const otp = generateOTP();
    await OtpModel.deleteOne({ email });
    await OtpModel.create({ email, otp });

    const sanitizedEmail = email.replace(/[\r\n]/g, '');
    console.log(`📧 Sending OTP to: ${sanitizedEmail}`);

    sendEmail(
      email,
      'MockRound.AI - Account Verification',
      otpEmail(name || 'User', otp, 'Verify your account', 'Use the code below to complete your registration.')
    )
      .then(() => console.log(`✅ OTP email sent to: ${email}`))
      .catch(err => console.error(`❌ OTP email failed to: ${email}`, err));

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    console.error('❌ SendOTP Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, name } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await UserModel.hashPassword(password);
    const user = await UserModel.create({ name, email, password: hashedPassword });
    const token = user.generateAuthToken();

    sendEmail(email, 'Welcome to MockRound.AI', welcomeEmail(name))
      .catch(err => console.error('Welcome email error:', err));

    return res.status(201).json({ success: true, token, user, message: 'Registration successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed' });
  }
};

export const sendLoginOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found with this email' });
    }

    const otp = generateOTP();
    await OtpModel.deleteOne({ email });
    await OtpModel.create({ email, otp });

    const sanitizedEmail2 = email.replace(/[\r\n]/g, '');
    console.log(`📧 Sending Login OTP to: ${sanitizedEmail2}`);

    sendEmail(
      email,
      'MockRound.AI - Login OTP',
      otpEmail(user.name, otp, 'Welcome back', 'Use the code below to sign in to your account.')
    )
      .then(() => console.log(`✅ Login OTP sent to: ${email}`))
      .catch(err => console.error(`❌ Login OTP failed to: ${email}`, err));

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error: any) {
    console.error('❌ SendLoginOTP Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyLoginOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const otpRecord = await OtpModel.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP not found or expired' });
    }

    if (otpRecord.otp !== otp.toString()) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const otpAge = Date.now() - otpRecord.createdAt.getTime();
    if (otpAge > 10 * 60 * 1000) {
      await OtpModel.deleteOne({ email });
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const token = user.generateAuthToken();
    await OtpModel.deleteOne({ email });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
