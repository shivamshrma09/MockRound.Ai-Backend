import express from 'express';
import cors from 'cors';
import mentorRoutes from './routes/mentors';

const app = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/user', mentorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});