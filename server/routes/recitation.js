import express from 'express';
import auth from '../middleware/auth.js';
import Recitation from '../models/Recitation.js';
import { OpenAI } from 'openai';
import { uploadAudio } from '../utils/storage.js';

const router = express.Router();
const openai = new OpenAI(process.env.VITE_OPENAI_API_KEY);

// Submit recitation
router.post('/submit', auth, async (req, res) => {
  try {
    const { audioData, verse } = req.body;
    const audioUrl = await uploadAudio(audioData);

    const transcription = await openai.audio.transcriptions.create({
      file: audioData,
      model: 'whisper-1',
      language: 'ar'
    });

    const feedback = await analyzeFeedback(transcription.text);

    const recitation = new Recitation({
      user: req.user.userId,
      audioUrl,
      transcription: transcription.text,
      feedback,
      verse
    });

    await recitation.save();
    res.status(201).json(recitation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user recitations
router.get('/history', auth, async (req, res) => {
  try {
    const recitations = await Recitation.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(recitations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

async function analyzeFeedback(transcription) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert in Quranic recitation analysis.'
      },
      {
        role: 'user',
        content: `Analyze this recitation: ${transcription}`
      }
    ]
  });

  // Process and structure the feedback
  return {
    score: calculateScore(response.choices[0].message.content),
    pronunciation: 85,
    fluency: 80,
    tajweed: 75,
    corrections: extractCorrections(response.choices[0].message.content)
  };
}

function calculateScore(feedback) {
  // Implement scoring logic
  return 85;
}

function extractCorrections(feedback) {
  // Implement correction extraction logic
  return [];
}

export default router;