import { Request, Response } from 'express';
import { OtpModel } from '../../models/Otp.model';

export const verifyOTP = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, otp } = req.body;
    
    const otpRecord = await OtpModel.findOne({ email });
    
    if (!otpRecord) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP not found or expired" 
      });
    }
    
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP" 
      });
    }
    
    await OtpModel.deleteOne({ email });
    
    return res.status(200).json({ 
      success: true, 
      message: "OTP verified successfully" 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "OTP verification failed" 
    });
  }
};
