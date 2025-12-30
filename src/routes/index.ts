import express from 'express';
import { body } from 'express-validator';
import userAuthRoutes from './User/user.auth.router';
import userInterviewRoutes from './User/user.interview.router';
import aiGeneratedInterviewRoutes from './User/ai.generated.interview.router';
import postRoutes from './User/post.routes';
import companyAuthRoutes from './Company/company.auth.router';
import challengeRoutes from './User/challenges.router';
import mentorRoutes from './User/mentor.routes';
import bookingRoutes from './User/booking.routes';
import slotBookingRoutes from './User/slot-booking.routes';
import participationRoutes from './User/participation.routes';
import googleAuthRoutes from './User/google.auth.router';
import feedbackRoutes from './User/feedback.routes';
import { handleValidationErrors } from '../middleware/validation.middleware';
import '../utils/updateroundstatus';


const router = express.Router();


router.use('/user', userAuthRoutes);
router.use('/user', userInterviewRoutes);
router.use('/user', aiGeneratedInterviewRoutes);
router.use('/user', challengeRoutes);
router.use('/user/posts', postRoutes);
router.use('/user', mentorRoutes);
router.use('/user', bookingRoutes);
router.use('/user', slotBookingRoutes);
router.use('/user', googleAuthRoutes);
router.use('/user', feedbackRoutes);






router.use('/company', companyAuthRoutes);


router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API routes are working',
    routes: {
      user: '/api/user',
      company: '/api/company',
      posts: '/api/user/posts',
      challenges: '/api/user/challenges',
      batchAnalysis: '/api/user/batch-analysis',
      technicalRound: '/api/user/technical-round-analysis',
      aiGeneratedInterview: '/api/user/technicalroundsubmit'
    }
  });
});

export default router;
