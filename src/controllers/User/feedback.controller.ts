import { Request, Response } from 'express';
import { Feedback } from '../../models/Feedback.model';
import { sendThankYouEmail } from '../../services/email.service';

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { content, userId, name, email } = req.body;

    const feedback = new Feedback({
      content,
      userId,
      name,
      email
    });

    await feedback.save();

    // Send thank you email
    if (email) {
      try {
        await sendThankYouEmail(email, name);
      } catch (emailError) {
        console.error('Failed to send thank you email:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
};

export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: error.message
    });
  }
};
