import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { UserExistsGuard } from './common/guards/user-exist..common.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    MessagesModule,
  ],
  providers: [UserExistsGuard],
})
export class AppModule {}
