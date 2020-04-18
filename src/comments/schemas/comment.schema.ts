import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  voting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voting'
  },
  user: String,
  text: String
}, {
  timestamps: { createdAt: true, updatedAt: false }
});