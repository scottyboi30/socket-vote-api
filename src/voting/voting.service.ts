import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Voting } from './interfaces/voting.interface';
import { VotingGateway } from './voting.gateway';

@Injectable()
export class VotingService {

    constructor(@InjectModel('Voting') private readonly votingModel: Model<Voting>, private votingGateway: VotingGateway) {}

    async createVoting(file, body): Promise<any> {
        const voting = await new this.votingModel(body);
        voting.image_file.data = file.buffer;
        voting.image_file.contentType = 'image/png';
        let savedDoc = await voting.save();

        return {id: savedDoc._id};
    }

    async getVotings(@Req() req): Promise<Voting[]> {
        const host = req.get('host');
        let result = await this.votingModel.find({}, {image_file: 0}).sort({createdAt: -1}).lean();
        result.map(item => {
            item.image = `http://${host}/voting/${item._id}/image`;
            return item;
        });
        return result;
    }

    async getVoting(id, @Req() req): Promise<Voting[]> {
        let voting = await this.votingModel.findById(id, {image_file: 0}).lean();
        const host = req.get('host');
        voting.image = `http://${host}/voting/${voting._id}/image`;
        return voting;
    }

    async getVotingImage(id) {
        let voting = await this.votingModel.findById(id);
        return voting.image_file.data;
    }

    async upvoteVoting(id, @Req() req): Promise<Voting> {
        let updatedVoting = await this.votingModel.findByIdAndUpdate(id, {
            $inc: {'upvotes': 1}
        }, {
            new: true,
            fields: { 'image_file': 0 },
        }).lean();
        const host = req.get('host');
        updatedVoting.image = `http://${host}/voting/${updatedVoting._id}/image`;
        
        this.votingGateway.votingChanged(updatedVoting);

        return updatedVoting;
    }

    async downvoteVoting(id, @Req() req): Promise<Voting> {
        let updatedVoting = await this.votingModel.findByIdAndUpdate(id, {
            $inc: {'downvotes': 1}
        }, {
            new: true,
            fields: { 'image_file': 0 },
        }).lean();
        const host = req.get('host');
        updatedVoting.image = `http://${host}/voting/${updatedVoting._id}/image`;

        this.votingGateway.votingChanged(updatedVoting);

        return updatedVoting;
    }

}
