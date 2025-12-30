import mongoose from 'mongoose';

const connectToDb = async (): Promise<void> => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected Successfully');
    } catch (error: any) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

export default connectToDb;
