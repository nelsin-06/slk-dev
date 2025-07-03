import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserExistsGuard } from '../common/guards/user-exist..common.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(UserExistsGuard)
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.messagesService.remove(+id);
  }
}
