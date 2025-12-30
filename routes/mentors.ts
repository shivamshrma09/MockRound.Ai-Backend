import express, { Request, Response } from 'express';

interface Mentor {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  expertise: string[];
  experience: number;
  pricePerHour: number;
  bio: string;
  availability: {
    day: string;
    slots: {
      startTime: string;
      endTime: string;
      isBooked: boolean;
    }[];
  }[];
}

const router = express.Router();

router.get('/mentors', (req: Request, res: Response) => {
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91-9876543210',
      profileImage: 'https://via.placeholder.com/150',
      expertise: ['JavaScript', 'React', 'Node.js'],
      experience: 5,
      pricePerHour: 1500,
      bio: 'Experienced full-stack developer',
      availability: [
        {
          day: 'monday',
          slots: [
            { startTime: '09:00', endTime: '10:00', isBooked: false },
            { startTime: '14:00', endTime: '15:00', isBooked: true }
          ]
        }
      ]
    }
  ];
  
  res.json({ success: true, data: mentors });
});

router.post('/mentors', (req: Request, res: Response) => {
  const { name, email, phone, profileImage, expertise, experience, pricePerHour, bio, availability }: Mentor = req.body;
  
  const newMentor: Mentor = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    profileImage,
    expertise,
    experience,
    pricePerHour,
    bio,
    availability
  };
  
  res.json({ success: true, message: 'Mentor created successfully', data: newMentor });
});

export default router;