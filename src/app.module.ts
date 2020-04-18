import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { NeconfigModule } from 'neconfig';
import { VotingModule } from './voting/voting.module';
import { CommentsModule } from './comments/comments.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule,
    NeconfigModule.register({
      readers: [
        { name: 'env', file: path.resolve(process.cwd(), '.env') }
      ]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    VotingModule,
    CommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
