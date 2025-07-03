import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      switch (error?.code) {
        case 'P2002':
          throw new ConflictException('Email already exists');
        default:
          throw new InternalServerErrorException(`Internal server error`);
      }
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException('Email already exists');
        default:
          throw new Error(`Internal server error`);
      }
    }
  }

  async remove(id: number) {
    return await this.prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }
}
