import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Comment extends Document {
    voting: mongoose.Schema.Types.ObjectId
    user: String,
    text: String
}