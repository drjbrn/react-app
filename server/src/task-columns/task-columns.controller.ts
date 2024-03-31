import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskColumnsService } from './task-columns.service';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';

@Controller('columns')
export class TaskColumnsController {
  constructor(private readonly taskColumnsService: TaskColumnsService) {}

  @Post()
  create(@Body() createTaskColumnDto: CreateTaskColumnDto) {
    return this.taskColumnsService.create(createTaskColumnDto);
  }

  @Get()
  findAll() {
    return this.taskColumnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskColumnsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskColumnDto: UpdateTaskColumnDto,
  ) {
    return this.taskColumnsService.update(+id, updateTaskColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskColumnsService.remove(+id);
  }
}
