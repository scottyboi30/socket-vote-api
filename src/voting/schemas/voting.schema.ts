import * as mongoose from 'mongoose';

export const VotingSchema = new mongoose.Schema({
    image_file: { 
        data: Buffer, 
        contentType: String
     },
    question: String,
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }
}, {
  timestamps: true
});