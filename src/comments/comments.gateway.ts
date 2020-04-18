import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentsService } from './comments.service';

@WebSocketGateway()
export class CommentsGateway {
    @WebSocketServer()
    server: Server;

    users = {};

    constructor(private commentService: CommentsService) {

    }

    @SubscribeMessage('joinVotingRoom')
    joinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.join(data.voting, err => {
            if (!this.users[data.voting]) {
                this.users[data.voting] = 0;
            } else {
                this.users[data.voting]++;
            }
        });
    }

    @SubscribeMessage('leaveVotingRoom')
    leaveRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.leave(data.voting, err => {
            if (!this.users[data.voting]) {
                this.users[data.voting] = 0;
            } else {
                this.users[data.voting]--;
            }
        });
    }

    @SubscribeMessage('comment')
    async onChat(@MessageBody() data: any){
        const savedComment = await this.commentService.saveComment(data);
        this.server.to(data.voting).emit('comment', savedComment);
    }
}