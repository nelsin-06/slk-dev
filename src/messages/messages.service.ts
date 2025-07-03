import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { DatabaseService } from '../database/database.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: DatabaseService,
    private usersService: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      return await this.prisma.message.create({
        data: createMessageDto,
      });
    } catch (error) {
      switch (error?.code) {
        case 'P2003':
          throw new ConflictException('user does not exist');
        default:
          throw new InternalServerErrorException(`Internal server error`);
      }
    }
  }

  async findAll() {
    return await this.prisma.message.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.message.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.message.delete({
      where: { id },
    });
  }

  async getUserMessages(id: number) {
    try {
      const user = await this.usersService.findOne(id);

      if (user === null) {
        throw new ConflictException({
          code: 'P2003',
          message: 'User does not exist',
        });
      }

      const data = await this.prisma.message.findMany({
        where: { userId: id },
      });
      return data;
    } catch (error) {
      switch (error.code || error.response.code) {
        case 'P2003':
          throw new ConflictException('User does not exist');
        default:
          throw new InternalServerErrorException(`Internal server error`);
      }
    }
  }
}
