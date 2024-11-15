import mongoose from 'mongoose';

const recitationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  transcription: String,
  feedback: {
    score: Number,
    pronunciation: Number,
    fluency: Number,
    tajweed: Number,
    corrections: [{
      word: String,
      correction: String,
      rule: String
    }]
  },
  verse: {
    surah: String,
    ayah: Number,
    text: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Recitation', recitationSchema);