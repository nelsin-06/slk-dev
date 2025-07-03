import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagesService } from '../messages/messages.service';
import { UserExistsGuard } from '../common/guards/user-exist..common.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(UserExistsGuard)
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(UserExistsGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserExistsGuard)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  @Get(':id/messages')
  @UseGuards(UserExistsGuard)
  async getUserMessages(@Param('id') id: string) {
    return await this.messagesService.getUserMessages(+id);
  }
}
