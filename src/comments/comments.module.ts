import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentSchema } from './schemas/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsGateway } from './comments.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: 'Comment', schema: CommentSchema } ]),
  ],
  controllers: [ CommentsController ],
  providers: [ CommentsService, CommentsGateway ]
})
export class CommentsModule { }
