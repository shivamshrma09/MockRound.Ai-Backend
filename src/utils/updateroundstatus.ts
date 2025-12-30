import * as cron from 'node-cron';
import mongoose from 'mongoose';
import { ChallengeModel } from '../models/Challenge.model';

const getCurrentIST = () => {
  
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; 
  return new Date(now.getTime() + istOffset);
};

const convertToIST = (utcDate) => {
  const istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(utcDate.getTime() + istOffset);
};

export const startRoundStatusUpdater = () => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      const challenges = await ChallengeModel.find({});
      const nowIST = getCurrentIST();

      for (let challenge of challenges) {
        let updated = false;
        
        for (let round of challenge.roundDetails) {
          
          const startIST = convertToIST(new Date(round.startDate));
          const endIST = convertToIST(new Date(round.endDate));
          let newStatus = 'upcoming';
          
          console.log(`Round ${round.roundNumber}: Current IST=${nowIST.toISOString()}, Start IST=${startIST.toISOString()}, End IST=${endIST.toISOString()}`);
          
          if (nowIST >= startIST && nowIST < endIST) {
            newStatus = 'live';
          } else if (nowIST >= endIST) {
            newStatus = 'completed';
          }
          
          if (round.status !== newStatus) {
            round.status = newStatus;
            updated = true;
            console.log(`${challenge.challengeName} - Round ${round.roundNumber}: ${round.status} -> ${newStatus}`);
          }
        }
        
        if (updated) {
          await challenge.save();
        }
      }
    } catch (error) {
      console.error('Round update error:', error.message);
    }
  }, {
    timezone: "Asia/Kolkata"
  });
};

if (mongoose.connection.readyState === 1) {
  startRoundStatusUpdater();
} else {
  mongoose.connection.once('open', startRoundStatusUpdater);
}
