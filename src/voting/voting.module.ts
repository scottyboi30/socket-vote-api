import { Module } from '@nestjs/common';
import { VotingController } from './voting.controller';
import { VotingService } from './voting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VotingSchema } from './schemas/voting.schema';
import { MulterModule } from '@nestjs/platform-express';
import { VotingGateway } from './voting.gateway';


@Module({
    imports: [
        MongooseModule.forFeature([ { name: 'Voting', schema: VotingSchema } ]),
        MulterModule.register()
    ],
    providers: [ VotingService, VotingGateway ],
    controllers: [ VotingController ]
})
export class VotingModule { }
