import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';
import { startRoundStatusUpdater } from './utils/updateroundstatus';

dotenv.config();

const PORT = process.env.PORT || 7000;
const INSTANCE_ID = process.env.RENDER_INSTANCE_ID || `instance-${Date.now()}`;

const connectDB = async () => {
  try {
    const options: mongoose.ConnectOptions = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    };
    await mongoose.connect(process.env.MONGODB_URI , options);
    console.log(`[${INSTANCE_ID}] MongoDB Connected`);
  } catch (error: any) {
    console.error(`[${INSTANCE_ID}] MongoDB Connection Failed:`, error.message);
    process.exit(1);
  }
};

const init = async () => {
  try {
    await connectDB();
    
    if (process.env.PRIMARY_INSTANCE === 'true') {
      startRoundStatusUpdater();
      console.log(`[${INSTANCE_ID}] Background jobs started`);
    }
    
    const server = app.listen(PORT, () => {
      console.log(`[${INSTANCE_ID}] Server running on port ${PORT}`);
    });

    process.on('SIGTERM', () => {
      server.close(() => {
        mongoose.connection.close();
        process.exit(0);
      });
    });

  } catch (error: any) {
    console.error('Server start error:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err: any) => {
  console.error('Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

init();
