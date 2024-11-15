import React, { useState } from 'react';
import { Mic, Square, Play, AlertCircle, Loader } from 'lucide-react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { transcribeAudio, analyzeFeedback } from '../services/openai';
import { motion } from 'framer-motion';
import RecitationFeedback from './RecitationFeedback';

export default function RecitationPractice() {
  const { isRecording, audioBlob, startRecording, stopRecording, error } = useAudioRecorder();
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
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
  } | null>(null);

  const handleToggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
      setIsProcessing(true);
      try {
        if (audioBlob) {
          const text = await transcribeAudio(audioBlob);
          setTranscription(text);
          const feedback = await analyzeFeedback(text);
          setFeedbackData(feedback);
        }
      } catch (err) {
        console.error('Processing error:', err);
      } finally {
        setIsProcessing(false);
      }
    } else {
      setTranscription(null);
      setFeedbackData(null);
      await startRecording();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Recitation Practice</h1>
        <p className="mt-2 text-gray-600">Perfect your recitation with AI-powered feedback</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="space-y-6">
          <div className="text-center">
            <div className="arabic-text text-3xl font-arabic mb-4">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <p className="text-gray-600">Bismillahi Ar-Rahman Ar-Raheem</p>
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleRecording}
              disabled={isProcessing}
              className={`p-4 rounded-full ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-emerald-500 hover:bg-emerald-600'
              } text-white transition-colors disabled:opacity-50`}
            >
              {isProcessing ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : isRecording ? (
                <Square className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </motion.button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {transcription && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Transcription:</h3>
              <p className="text-gray-700 font-arabic text-lg">{transcription}</p>
            </div>
          )}

          {feedbackData && <RecitationFeedback {...feedbackData} />}

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tips for Improvement</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-2">
                <Play className="h-4 w-4 text-emerald-500" />
                <span>Listen to the reference audio multiple times</span>
              </li>
              <li className="flex items-center space-x-2">
                <Play className="h-4 w-4 text-emerald-500" />
                <span>Focus on proper pronunciation of heavy letters</span>
              </li>
              <li className="flex items-center space-x-2">
                <Play className="h-4 w-4 text-emerald-500" />
                <span>Practice the correct pause positions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}