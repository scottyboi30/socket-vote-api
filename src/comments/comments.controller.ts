import { Controller, Get, Res, Param, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {

    }
    
    @Get(':id')
    async getVoting(@Res() res, @Param('id') id) {
        const comments = await this.commentsService.getComments(id);
        return res.status(HttpStatus.OK).json(comments);
    }
}
