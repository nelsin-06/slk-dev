import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { MessagesService } from '../messages/messages.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MessagesService],
  imports: [DatabaseModule],
  exports: [UsersService],
})
export class UsersModule {}
