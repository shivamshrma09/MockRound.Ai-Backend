import express from 'express';
import { body, param } from 'express-validator';
import { 
  createChallenge, 
  enrollInChallenge, 
  getChallengeDetails,
  liveChallenge,
  saveUserQuestions,
  addSuspiciousActivity,
  getRandomCodingQuestions,
  checkUserParticipation,
  debugUserStatus,
  getRandomTechnicalQuestions,
  getAllChallenges
} from '../../controllers/User/challenges.controller';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const csrfProtection = (req: any, res: any, next: any) => {
  const customHeader = req.headers['x-requested-with'];
  if (!customHeader || customHeader !== 'XMLHttpRequest') {
    return res.status(403).json({ error: 'CSRF protection: Missing required header' });
  }
  next();
};

const router = express.Router();

router.post('/create-challenge', [
  body('challengeName').notEmpty().withMessage('Challenge name is required'),
  body('company_Name').notEmpty().withMessage('Company name is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('roundDetails').isArray().withMessage('Round details must be an array'),
  handleValidationErrors
], createChallenge);

router.post('/enroll-challenge', [
  body('challengeID').notEmpty().withMessage('Challenge ID is required'),
  body('candidateName').notEmpty().withMessage('Candidate name is required'),
  body('userEmail').isEmail().withMessage('Valid email is required'),
  body('userID').notEmpty().withMessage('User ID is required'),
  body('resume').optional().isString().withMessage('Resume must be a string'),
  handleValidationErrors
], enrollInChallenge);


    

router.post('/live', csrfProtection, [
  body('userId').notEmpty().withMessage('User ID is required'),
  handleValidationErrors
], liveChallenge);

router.post('/challenge/save-questions', [
  body('challengeID').notEmpty().withMessage('Challenge ID is required'),
  body('roundNumber').notEmpty().withMessage('Round number is required'),
  body('candidateID').notEmpty().withMessage('Candidate ID is required'),
  body('candidateName').notEmpty().withMessage('Candidate name is required'),
  body('candidateEmail').isEmail().withMessage('Valid email is required'),
  body('questions').isArray().withMessage('Questions must be an array'),
  handleValidationErrors
], saveUserQuestions);


router.post('/challenge/addsuspiciousactivity', [
  body('challengeID').notEmpty().withMessage('Challenge ID is required'),
  body('roundNumber').notEmpty().withMessage('Round number is required'),
  body('candidateID').notEmpty().withMessage('Candidate ID is required'),
  body('suspiciousActivities').isArray().withMessage('Suspicious activities must be an array'),
  handleValidationErrors
], addSuspiciousActivity);

router.get('/coding-questions', getRandomCodingQuestions);
router.get('/technical-questions', getRandomTechnicalQuestions);



router.post('/check-participation', [
  body('userEmail').isEmail().withMessage('Valid email is required'),
  body('challengeID').notEmpty().withMessage('Challenge ID is required'),
  body('roundNumber').notEmpty().withMessage('Round number is required'),
], checkUserParticipation);

router.post('/debug-status', [
  body('userId').notEmpty().withMessage('User ID is required'),
  handleValidationErrors
], debugUserStatus);

router.get('/all-challenges', getAllChallenges);

export default router;
