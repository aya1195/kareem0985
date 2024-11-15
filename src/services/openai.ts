import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const response = await openai.audio.transcriptions.create({
      file: audioBlob,
      model: 'whisper-1',
      language: 'ar',
    });

    return response.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
};

export const analyzeFeedback = async (transcription: string): Promise<{
  score: number;
  feedback: string;
  details: {
    pronunciation: number;
    fluency: number;
    tajweed: number;
  };
  corrections: Array<{
    word: string;
    correction: string;
    rule: string;
  }>;
}> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in Quranic recitation analysis. Analyze the following Arabic text for pronunciation accuracy, Tajweed rules, and fluency.',
        },
        {
          role: 'user',
          content: `Please analyze this recitation: ${transcription}`,
        },
      ],
      functions: [
        {
          name: 'provideFeedback',
          parameters: {
            type: 'object',
            properties: {
              score: {
                type: 'number',
                description: 'Overall score out of 100',
              },
              feedback: {
                type: 'string',
                description: 'General feedback about the recitation',
              },
              details: {
                type: 'object',
                properties: {
                  pronunciation: {
                    type: 'number',
                    description: 'Pronunciation accuracy score out of 100',
                  },
                  fluency: {
                    type: 'number',
                    description: 'Fluency score out of 100',
                  },
                  tajweed: {
                    type: 'number',
                    description: 'Tajweed rules adherence score out of 100',
                  },
                },
              },
              corrections: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    word: {
                      type: 'string',
                      description: 'The word with error',
                    },
                    correction: {
                      type: 'string',
                      description: 'The correct pronunciation',
                    },
                    rule: {
                      type: 'string',
                      description: 'The applicable Tajweed rule',
                    },
                  },
                },
              },
            },
            required: ['score', 'feedback', 'details', 'corrections'],
          },
        },
      ],
      function_call: { name: 'provideFeedback' },
    });

    const result = JSON.parse(
      response.choices[0].message.function_call?.arguments || '{}'
    );

    return result;
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error('Failed to analyze recitation');
  }
};