import { Controller, Get, Res, Body, Param, NotFoundException, HttpStatus, Post, UseInterceptors, UploadedFile, Put, Req } from '@nestjs/common';
import { VotingService } from './voting.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('voting')
export class VotingController {

    constructor(private votingService: VotingService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async startVoting(@UploadedFile() file, @Res() res, @Body() body) {        
        const order = await this.votingService.createVoting(file, body);
        if (!order) {
            return res.status(HttpStatus.BAD_REQUEST);
        }
        return res.status(HttpStatus.OK).json(order);
    }

    @Get()
    async getVotings(@Res() res, @Req() req) {
        const votings = await this.votingService.getVotings(req);
        return res.status(HttpStatus.OK).json(votings);
    }


    @Get(':id')
    async getVoting(@Res() res, @Req() req, @Param('id') id) {
        const voting = await this.votingService.getVoting(id, req);
        return res.status(HttpStatus.OK).json(voting);
    }

    @Get(':id/image')
    async getVotingImage(@Res() res, @Body() body, @Param('id') id) {
        const image = await this.votingService.getVotingImage(id);
        if (!image) throw new NotFoundException('Image does not exist!');
        res.setHeader('Content-Type', 'image/png');
        return res.send(image);
    }

    @Put(':id/up')
    async upvote(@Res() res, @Body() body, @Param('id') id, @Req() req) {
        const voting = await this.votingService.upvoteVoting(id, req);
        if (!voting) throw new NotFoundException('Voting does not exist!');
        return res.status(HttpStatus.OK).json(voting);
    }

    @Put(':id/down')
    async downvote(@Res() res, @Body() body, @Param('id') id, @Req() req) {
        const voting = await this.votingService.downvoteVoting(id, req);
        if (!voting) throw new NotFoundException('Voting does not exist!');
        return res.status(HttpStatus.OK).json(voting);
    }
}
