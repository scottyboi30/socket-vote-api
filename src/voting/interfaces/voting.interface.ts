import { Document } from 'mongoose';

export interface Voting extends Document {
    image_file: { 
        data: Buffer, 
        contentType: String
     },
    question: string,
    upvotes: number,
    downvotes: number
}