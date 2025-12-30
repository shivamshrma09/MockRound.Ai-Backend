import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ChallengeModel } from '../../models/Challenge.model';
import { UserModel } from '../../models/User.model';
import { sendEmail } from '../../services/sendemail.services';
import { Types } from 'mongoose';

const createEnrollmentEmail = (candidateName: string, challengeName: string, company_Name: string, role: string, totalRounds: number) => {
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
            <h1 style="color: #000; font-size: 28px; margin: 0 0 10px 0;">Challenge Enrollment Confirmed!</h1>
            <p style="color: #666; font-size: 14px; margin: 0;">You're all set to begin your journey</p>
        </div>
        
        <div style="width: 100%; border: 1px solid #333; display: flex; flex-direction: column; padding: 25px; border-radius: 8px;">
            
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0; text-align: center;">
                Hey <strong>${candidateName}</strong>! 🎉
            </p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #333; font-size: 13px; margin: 0 0 10px 0;">You have successfully enrolled in the <strong>${challengeName}</strong> challenge.</p>
                <p style="color: #666; font-size: 12px; margin: 0;">Get ready to showcase your skills and compete with other talented developers!</p>
            </div>

            <h2 style="color: #000; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #d97757; padding-bottom: 10px;">Challenge Details</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="color: #333; font-size: 13px; margin: 0 0 8px 0;"><strong>Company:</strong> ${company_Name}</p>
                <p style="color: #333; font-size: 13px; margin: 0 0 8px 0;"><strong>Position:</strong> ${role}</p>
                <p style="color: #333; font-size: 13px; margin: 0 0 8px 0;"><strong>Total Rounds:</strong> ${totalRounds}</p>
                <p style="color: #666; font-size: 12px; margin: 0;">You will progress through multiple rounds with increasing difficulty levels.</p>
            </div>

            <h2 style="color: #000; font-size: 16px; margin: 0 0 12px 0; border-bottom: 2px solid #d97757; padding-bottom: 8px;">What's Next?</h2>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <ol style="color: #555; font-size: 12px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Check the challenge details and round information</li>
                    <li>Review the instructions for each round carefully</li>
                    <li>Participate in the registration round first</li>
                    <li>Progress through subsequent rounds based on your performance</li>
                    <li>Check your results and feedback after each round</li>
                </ol>
            </div>

            <div style="background: #d97757; border-radius: 6px; padding: 15px; text-align: center; margin-bottom: 20px;">
                <p style="color: white; font-size: 13px; font-weight: bold; margin: 0 0 5px 0;">Ready to Begin?</p>
                <p style="color: #f5f5f5; font-size: 11px; margin: 0;">Log in to MockRound.AI to view your challenge and start participating in rounds</p>
            </div>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #000; font-size: 13px; margin: 0 0 8px 0;"><strong>Pro Tips:</strong></h3>
                <ul style="color: #666; font-size: 11px; margin: 0; padding-left: 20px; line-height: 1.8;">
                    <li>Read all instructions before starting each round</li>
                    <li>Manage your time wisely during the challenge</li>
                    <li>Check your code/answers thoroughly before submitting</li>
                    <li>Pay attention to anti-cheating mechanisms</li>
                    <li>Keep your login credentials secure</li>
                </ul>
            </div>

            <p style="color: #999; font-size: 11px; margin: 0 0 15px 0; text-align: center; line-height: 1.4;">
                If you have any questions or face technical issues, please contact<br>
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

export const enrollInChallenge = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { challengeID, candidateName, userEmail, userID, resume } = req.body;
    
    let challenge = await ChallengeModel.findById(challengeID);
    if (!challenge) {
      challenge = await ChallengeModel.findOne({ challengeId: challengeID });
    }
    
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    const existingCandidate = challenge.candidateDetails.find(
      (candidate: any) => candidate.candidateID.toString() === userID
    );
    
    if (existingCandidate) {
      return res.status(409).json({ success: false, message: 'Already enrolled in this challenge' });
    }

    const candidateDetails = {
      candidateID: userID,
      candidateName,
      candidateEmail: userEmail,
      dateOfEnrollment: new Date(),
      resume: resume || '',
      status: 'enrolled'
    };

    const updatedChallenge = await ChallengeModel.findByIdAndUpdate(
      challengeID,
      { $push: { candidateDetails: candidateDetails } },
      { new: true }
    );

    if (!updatedChallenge) {
      return res.status(404).json({ success: false, message: 'Failed to update challenge' });
    }

    const emailHtml = createEnrollmentEmail(
      candidateName,
      updatedChallenge.challengeName,
      updatedChallenge.company_Name,
      updatedChallenge.role,
      updatedChallenge.roundDetails.length
    );

    await sendEmail(userEmail, `Challenge Enrollment - ${updatedChallenge.challengeName}`, emailHtml);

    return res.status(201).json({
      success: true,
      message: 'Successfully enrolled in challenge',
      challengeId: challengeID,
      enrollmentDate: candidateDetails.dateOfEnrollment
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getChallengeDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { challengeID } = req.params;
    
    const challenge = await ChallengeModel.findById(challengeID)
      .populate('candidateDetails.candidateID', 'name email')
      .populate('roundData.passedCandidateIds', 'name email');

    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    return res.status(200).json({
      success: true,
      challenge
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const createChallenge = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      challengeName,
      company_Name,
      role,
      description,
      roundDetails
    } = req.body;

    if (!roundDetails || !Array.isArray(roundDetails)) {
      return res.status(400).json({
        success: false,
        error: 'roundDetails must be an array'
      });
    }

    const processedRoundDetails = roundDetails.map((round: any) => ({
      roundNumber: round.roundNumber || 0,
      roundName: round.roundName || 'Unknown Round',
      roundType: round.roundType || 'general',
      startDate: round.startTime ? new Date(round.startTime) : new Date(),
      endDate: round.endTime ? new Date(round.endTime) : new Date(),
      resultDate: round.resultTime ? new Date(round.resultTime) : new Date(),
      duration: round.duration ? round.duration.toString() : '0',
      totalQuestions: round.totalQuestions || 0,
      description: round.description || '',
      instructions: round.instructions || '',
      status: round.roundNumber === 0 ? 'live' : 'upcoming',
      type: 'online'
    }));

    const challenge = await ChallengeModel.create({
      challengeName,
      company_Name,
      role,
      description: description || '',
      roundDetails: processedRoundDetails,
      candidateDetails: [],
      roundData: [],
      rawData: [],
      status: 'active'
    });

    return res.status(201).json({
      success: true,
      message: 'Challenge created successfully',
      challengeId: challenge._id,
      totalRounds: processedRoundDetails.length
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const liveChallenge = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'error',
        error: 'userId is required',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'error',
        error: 'Invalid userId format',
      });
    }

    const challenges = await ChallengeModel.find({});

    if (!challenges || challenges.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'error',
        error: 'No challenges found',
      });
    }

    const liveRounds: any[] = [];
    const completedRounds: any[] = [];

    for (const challenge of challenges) {
      for (const round of challenge.roundDetails) {
        const roundData = {
          challengeId: challenge._id,
          challengeName: challenge.challengeName,
          company_Name: challenge.company_Name,
          role: challenge.role,
          description: challenge.description,
          roundId: round._id,
          roundNumber: round.roundNumber,
          roundName: round.roundName,
          startDate: round.startDate,
          endDate: round.endDate,
          resultDate: round.resultDate,
          status: round.status,
        };

        if (round.status === 'live') {
          liveRounds.push(roundData);
        } else if (round.status === 'completed') {
          completedRounds.push(roundData);
        }
      }
    }

    let userRegistration: any = null;
    let userChallengeId: any = null;

    for (const challenge of challenges) {
      const candidate = challenge.candidateDetails.find(
        (cand: any) => cand.candidateID.toString() === userId.toString()
      );
      if (candidate) {
        userRegistration = candidate;
        userChallengeId = challenge._id;
        break;
      }
    }

    if (!userRegistration) {
      const registrationRound = liveRounds.find(
        (r) => r.roundName === 'Registration Round'
      );

      if (registrationRound) {
        return res.status(403).json({
          success: false,
          message: 'not_reg',
          details: 'User is not registered. Join now!',
          registrationRound,
          action: 'JOIN_NOW',
        });
      } else {
        const registrationCompleted = completedRounds.find(
          (r) => r.roundName === 'Registration Round'
        );

        return res.status(403).json({
          success: false,
          message: 'not_reg',
          details: 'Registration closed. Try next time!',
          lastRegistrationRound: registrationCompleted || null,
          action: 'TRY_NEXT_TIME',
        });
      }
    }

    if (liveRounds.length === 0) {
      completedRounds.sort((a, b) => {
        return (
          new Date(b.resultDate).getTime() - new Date(a.resultDate).getTime()
        );
      });

      return res.status(200).json({
        success: true,
        message: 'reg_done',
        details: 'No live rounds available',
        userRegistration: {
          candidateName: userRegistration.candidateName,
          candidateEmail: userRegistration.candidateEmail,
          dateOfEnrollment: userRegistration.dateOfEnrollment,
          status: userRegistration.status,
        },
        eligibleRounds: [],
        ineligibleRounds: [],
        latestCompletedRound: completedRounds[0] || null,
        action: 'SHOW_RESULTS',
      });
    }

    const registrationRoundLive = liveRounds.some(
      (r) => r.roundName === 'Registration Round'
    );

    if (registrationRoundLive) {
      const eligibleRounds = liveRounds.map((r) => ({
        ...r,
        eligibility: 'eligible_registered_user',
      }));

      return res.status(200).json({
        success: true,
        message: 'reg_done',
        details: 'Registration round live',
        registrationRoundLive: true,
        userRegistration: {
          candidateName: userRegistration.candidateName,
          candidateEmail: userRegistration.candidateEmail,
          dateOfEnrollment: userRegistration.dateOfEnrollment,
          status: userRegistration.status,
        },
        eligibleRounds,
        ineligibleRounds: [],
        action: 'ALREADY_REGISTERED',
      });
    }

    const registrationCompleted = completedRounds.some(
      (r) => r.roundName === 'Registration Round'
    );

    if (registrationCompleted) {
      let userPassedRegistration = false;

      for (const challenge of challenges) {
        const registrationRoundData = challenge.roundData.find(
          (round: any) => round.roundNumber === 0
        );

        if (registrationRoundData) {
          userPassedRegistration = registrationRoundData.passedCandidateIds.some(
            (id: any) => id.toString() === userId.toString()
          );

          if (userPassedRegistration) break;
        }
      }

      if (!userPassedRegistration) {
        return res.status(403).json({
          success: true,
          message: 'reg_done',
          details: 'Did not pass registration round',
          userRegistration: {
            candidateName: userRegistration.candidateName,
            candidateEmail: userRegistration.candidateEmail,
            status: 'not_selected',
          },
          eligibleRounds: [],
          ineligibleRounds: liveRounds.map(r => ({
            ...r,
            reason: 'not_passed_registration',
          })),
          action: 'NOT_SELECTED',
        });
      }
    }

    const eligibleRounds: any[] = [];
    const ineligibleRounds: any[] = [];

    const userChallenge = challenges.find(
      (c: any) => c._id.toString() === userChallengeId.toString()
    );

    if (!userChallenge) {
      return res.status(500).json({
        success: false,
        message: 'error',
        error: 'Challenge data not found',
      });
    }

    for (const liveRound of liveRounds) {
      if (liveRound.roundName === 'Registration Round') {
        continue;
      }

      const previousRoundNumber = liveRound.roundNumber - 1;
      const previousRound = userChallenge.roundDetails.find(
        (r: any) => r.roundNumber === previousRoundNumber
      );

      if (!previousRound) {
        eligibleRounds.push({
          ...liveRound,
          eligibility: 'eligible',
          reason: 'first_round_after_registration',
        });
        continue;
      }

      const previousRoundData = userChallenge.roundData.find(
        (rd: any) => rd.roundNumber === previousRoundNumber
      );

      if (!previousRoundData) {
        ineligibleRounds.push({
          ...liveRound,
          reason: 'not_participated',
          previousRoundName: previousRound.roundName,
          message: `You did not participate in ${previousRound.roundName}`,
        });
        continue;
      }

      const userPassed = previousRoundData.passedCandidateIds.some(
        (id: any) => id.toString() === userId.toString()
      );

      if (userPassed) {
        eligibleRounds.push({
          ...liveRound,
          eligibility: 'eligible',
          previousRoundName: previousRound.roundName,
          message: `You passed ${previousRound.roundName}. Good luck!`,
        });
      } else {
        ineligibleRounds.push({
          ...liveRound,
          reason: 'not_passed',
          previousRoundName: previousRound.roundName,
          message: `You were not selected in ${previousRound.roundName}`,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'reg_done',
      details:
        eligibleRounds.length > 0
          ? `You are eligible for ${eligibleRounds.length} round(s)`
          : 'You are not eligible for any live round at the moment',
      userRegistration: {
        candidateName: userRegistration.candidateName,
        candidateEmail: userRegistration.candidateEmail,
        dateOfEnrollment: userRegistration.dateOfEnrollment,
        status: userRegistration.status,
      },
      eligibleRounds,
      ineligibleRounds,
      totalEligibleRounds: eligibleRounds.length,
      totalIneligibleRounds: ineligibleRounds.length,
      action: eligibleRounds.length > 0 ? 'JOIN_ROUND' : 'NOT_ELIGIBLE',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'error',
      error: 'Server error',
    });
  }
};

export const saveUserQuestions = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { challengeID, roundNumber, candidateID, candidateName, candidateEmail, questions } = req.body;
    
    if (!challengeID || !roundNumber || !candidateID || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    const challenge = await ChallengeModel.findById(challengeID);
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    let finalCandidateName = candidateName;
    let finalCandidateEmail = candidateEmail;
    
    if (!finalCandidateName || !finalCandidateEmail) {
      const candidateDetails = challenge.candidateDetails.find(
        (cand: any) => cand.candidateID.toString() === candidateID.toString()
      );
      
      if (candidateDetails) {
        finalCandidateName = finalCandidateName || candidateDetails.candidateName;
        finalCandidateEmail = finalCandidateEmail || candidateDetails.candidateEmail;
      }
    }

    let rawDataEntry = challenge.rawData.find((rd: any) => 
      Number(rd.roundNumber) === Number(roundNumber)
    );

    if (!rawDataEntry) {
      rawDataEntry = {
        roundNumber: Number(roundNumber),
        roundName: `Round ${roundNumber}`,
        students: []
      };
      challenge.rawData.push(rawDataEntry);
    }

    let student = rawDataEntry.students.find((s: any) => {
      const studentCandidateId = s.candidateID?.toString?.() || s.candidateID;
      const incomingCandidateId = candidateID?.toString?.() || candidateID;
      return studentCandidateId === incomingCandidateId;
    });

    if (!student) {
      student = {
        candidateID,
        candidateName: finalCandidateName,
        candidateEmail: finalCandidateEmail,
        questions: [],
        suspiciousActivity: []
      };
      rawDataEntry.students.push(student);
    }

    const questionsToAdd = questions.map((q: any) => ({
      question: q.question || q.title || 'Unknown',
      answer: q.answer || q.userCode || q.solution || '',
      timestamp: new Date()
    }));

    student.questions.push(...questionsToAdd);
    
    await challenge.save();

    return res.status(201).json({
      success: true,
      message: 'Questions saved successfully',
      savedQuestions: questionsToAdd.length,
      candidateID,
      challengeID
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const addSuspiciousActivity = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { challengeID, roundNumber, candidateID, suspiciousActivities } = req.body;
    
    if (!challengeID || !roundNumber || !candidateID || !Array.isArray(suspiciousActivities)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    const challenge = await ChallengeModel.findById(challengeID);
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    let rawDataEntry = challenge.rawData.find((rd: any) => 
      Number(rd.roundNumber) === Number(roundNumber)
    );

    if (!rawDataEntry) {
      rawDataEntry = {
        roundNumber: Number(roundNumber),
        roundName: `Round ${roundNumber}`,
        students: []
      };
      challenge.rawData.push(rawDataEntry);
    }

    let student = rawDataEntry.students.find((s: any) => {
      const sId = s.candidateID?.toString?.() || s.candidateID;
      return sId === candidateID;
    });

    if (!student) {
      const candidateDetails = challenge.candidateDetails.find(
        (cand: any) => cand.candidateID.toString() === candidateID.toString()
      );
      
      student = {
        candidateID,
        candidateName: candidateDetails?.candidateName || 'Unknown',
        candidateEmail: candidateDetails?.candidateEmail || 'Unknown',
        questions: [],
        suspiciousActivity: []
      };
      rawDataEntry.students.push(student);
    }

    const activitiesToAdd = suspiciousActivities.map((activity: any) => ({
      title: activity.title || 'Unknown Activity',
      img: activity.img || '',
      video: activity.video || '',
      timestamp: new Date()
    }));

    student.suspiciousActivity.push(...activitiesToAdd);

    await challenge.save();

    return res.status(201).json({
      success: true,
      message: 'Suspicious activities added successfully',
      addedActivities: activitiesToAdd.length,
      candidateID,
      roundNumber
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getRandomCodingQuestions = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { count = 3 } = req.query;
    const { codingQuestions } = await import('../../data/codingQuestions');
    
    const shuffled = [...codingQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Number(count));
    
    return res.status(200).json({
      success: true,
      totalQuestions: selectedQuestions.length,
      questions: selectedQuestions
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getRandomTechnicalQuestions = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { count = 15 } = req.query;
    const { technicalMCQDatabase } = await import('../../data/technicalMCQDatabase');
    
    const shuffled = [...technicalMCQDatabase].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Number(count));
    
    return res.status(200).json({
      success: true,
      totalQuestions: selectedQuestions.length,
      questions: selectedQuestions
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const checkUserParticipation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userEmail, challengeID, roundNumber } = req.body;
    
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found with this email' 
      });
    }

    const userId = user._id.toString();

    const challenge = await ChallengeModel.findById(challengeID);
    if (!challenge) {
      return res.status(404).json({ success: false, message: 'Challenge not found' });
    }

    const liveRound = challenge.roundDetails.find((round: any) => 
      Number(round.roundNumber) === Number(roundNumber) && round.status === "live"
    );

    if (!liveRound) {
      return res.status(200).json({
        success: false,
        message: 'Round is not live',
        roundStatus: 'not_live',
        hasParticipated: false
      });
    }

    const rawDataEntry = challenge.rawData.find((rd: any) => 
      Number(rd.roundNumber) === Number(roundNumber)
    );

    let hasParticipated = false;

    if (rawDataEntry) {
      const student = rawDataEntry.students.find((s: any) => {
        const sId = s.candidateID?.toString?.() || s.candidateID;
        return sId === userId;
      });

      if (student && student.questions && student.questions.length > 0) {
        hasParticipated = true;
      }
    }

    return res.status(200).json({
      success: true,
      hasParticipated,
      userId,
      userEmail
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const debugUserStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.body;
    
    const challenges = await ChallengeModel.find({});
    const userEnrollments = [];
    
    for (const challenge of challenges) {
      const enrollment = challenge.candidateDetails.find(
        (cand: any) => cand.candidateID.toString() === userId
      );
      
      if (enrollment) {
        userEnrollments.push({
          challengeId: challenge._id,
          challengeName: challenge.challengeName,
          company_Name: challenge.company_Name,
          enrollmentStatus: enrollment.status,
          enrollmentDate: enrollment.dateOfEnrollment
        });
      }
    }
    
    return res.status(200).json({
      success: true,
      userId,
      totalChallenges: challenges.length,
      userEnrollments,
      isEnrolledAnywhere: userEnrollments.length > 0,
      challengeRounds: challenges.map(c => ({
        challengeName: c.challengeName,
        rounds: c.roundDetails.map(r => ({
          roundName: r.roundName,
          roundNumber: r.roundNumber,
          status: r.status,
          startDate: r.startDate,
          endDate: r.endDate
        }))
      }))
    });
    
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getAllChallenges = async (req: Request, res: Response): Promise<Response> => {
  try {
    const challenges = await ChallengeModel.find({}).select('_id challengeName company_Name role status createdAt');
    
    return res.status(200).json({
      success: true,
      totalChallenges: challenges.length,
      challenges: challenges.map(c => ({
        id: c._id,
        challengeName: c.challengeName,
        company_Name: c.company_Name,
        role: c.role,
        status: c.status,
        createdAt: c.createdAt
      }))
    });
    
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
