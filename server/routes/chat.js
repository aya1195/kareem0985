import express from 'express';
import { OpenAI } from 'openai';
import auth from '../middleware/auth.js';

const router = express.Router();
const openai = new OpenAI(process.env.VITE_OPENAI_API_KEY);

router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful Quran teacher assistant, knowledgeable about Tajweed rules, pronunciation, and Islamic teachings."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Failed to process message' });
  }
});

export default router;