import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { Repository } from 'typeorm';
import { TaskColumn } from './entities/task-column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLogService } from 'src/activity-log/activity-log.service';

@Injectable()
export class TaskColumnsService {
  constructor(
    @InjectRepository(TaskColumn)
    private taskColumnRepository: Repository<TaskColumn>,
    private activityLogService: ActivityLogService,
  ) {}

  async create(createTaskColumnDto: CreateTaskColumnDto) {
    const isExist = await this.taskColumnRepository.findBy({
      title: createTaskColumnDto.title,
    });

    if (isExist.length)
      throw new BadRequestException('This columns already exist');

    const newColumns = {
      title: createTaskColumnDto.title,
    };

    const createNewColumn = await this.taskColumnRepository.save(newColumns);
    await this.activityLogService.logAction(
      'create',
      'column',
      createNewColumn.id,
      `Column '${createNewColumn.title}' created.`,
    );

    return createNewColumn;
  }

  async findAll() {
    return await this.taskColumnRepository.find({
      relations: {
        tasks: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const column = await this.taskColumnRepository.findOne({
      where: { id },
      relations: {
        tasks: true,
      },
    });

    if (!column) throw new NotFoundException('Column not found');

    return column;
  }

  async update(id: number, updateTaskColumnDto: UpdateTaskColumnDto) {
    const column = await this.taskColumnRepository.findOne({
      where: { id },
      relations: {
        tasks: true,
      },
    });

    if (!column) throw new NotFoundException('Column not found');

    const editColumn = await this.taskColumnRepository.update(
      id,
      updateTaskColumnDto,
    );
    await this.activityLogService.logAction(
      'update',
      'column',
      id,
      `Column '${updateTaskColumnDto.title}' updated.`,
    );

    return editColumn;
  }

  async remove(id: number) {
    const column = await this.taskColumnRepository.findOne({
      where: { id },
    });

    if (!column) throw new NotFoundException('Column not found');

    const removedColumn = await this.taskColumnRepository.delete(id);

    await this.activityLogService.logAction(
      'remove',
      'column',
      id,
      `Column '${column.title}' deleted.`,
    );

    return removedColumn;
  }
}
