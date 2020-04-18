import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Voting } from './interfaces/voting.interface';

@WebSocketGateway()
export class VotingGateway {
    @WebSocketServer()
    server: Server;

    constructor(@InjectModel('Voting') private readonly votingModel: Model<Voting>) {}

    async votingChanged(voting) {
        this.server.to(voting._id).emit('voting', voting);
    }

    @SubscribeMessage('votechange')
    async onVoteChanged(@MessageBody() data: any){
        const id = data.id;
        let updatedVoting;
        if (data.upvote) {
            updatedVoting = await this.votingModel.findByIdAndUpdate(id, {
                $inc: {'upvotes': 1}
            }, {
                new: true,
                fields: { 'image_file': 0 },
            }).lean();
        } else {
            updatedVoting = await this.votingModel.findByIdAndUpdate(id, {
                $inc: {'downvotes': 1}
            }, {
                new: true,
                fields: { 'image_file': 0 },
            }).lean();
        }

        this.votingChanged(updatedVoting);
    }
}