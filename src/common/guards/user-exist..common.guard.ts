import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = Number(request.params.id ?? request.body.userId);

    if (isNaN(userId)) {
      throw new NotFoundException('Invalid user id');
    }

    const user = await this.usersService.findOne(userId);

    if (!user || !user.active) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return true;
  }
}
