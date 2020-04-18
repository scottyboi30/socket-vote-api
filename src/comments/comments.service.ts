import { Comment } from './interfaces/comment.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {

    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) {

    }

    async saveComment(info): Promise<any> {
        const comment = await new this.commentModel(info);
        return comment.save();
    }

    async getComments(id): Promise<Comment[]> {
        return this.commentModel.find({voting: id}).sort({createdAt: -1});
    }
    
}
