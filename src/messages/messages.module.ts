import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, UsersService],
})
export class MessagesModule {}
