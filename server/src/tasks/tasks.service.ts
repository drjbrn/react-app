import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { TaskColumnsService } from 'src/task-columns/task-columns.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private activityLogService: ActivityLogService,
    private tasksColumnService: TaskColumnsService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      priority: createTaskDto.priority,
      dueDate: createTaskDto.dueDate,
      column: { id: +createTaskDto.column },
    };

    if (!newTask) throw new BadRequestException('Something went wrong');

    const createNewTask = await this.taskRepository.save(newTask);
    await this.activityLogService.logAction(
      'create',
      'task',
      createNewTask.id,
      `Task '${createNewTask.title}' created.`,
    );

    return createNewTask;
  }

  async findAll() {
    const tasks = await this.taskRepository.find({
      relations: {
        column: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        column: true,
      },
    });

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['column'],
    });

    if (!task) throw new NotFoundException('Task not found');

    const previousState = { ...task };

    const editTask = await this.taskRepository.update(id, updateTaskDto);

    for (const key in updateTaskDto) {
      if (previousState[key] !== updateTaskDto[key]) {
        let message = `Task '${task.title}' updated from '${previousState[key]}' to '${updateTaskDto[key]}'.`;

        switch (key) {
          case 'column':
            const column = await this.tasksColumnService.findOne(
              +updateTaskDto.column,
            );
            message = `Task '${task.title}' moved to '${column.title}'.`;
            break;
          case 'title':
            message = `Task '${previousState.title}' title changed to '${updateTaskDto.title}'.`;
            break;
          case 'priority':
            message = `Task '${task.title}' priority changed from '${previousState.priority}' to '${updateTaskDto.priority}'.`;
            break;
          case 'description':
            message = `Task '${task.title}' description updated.`;
            break;
          case 'dueDate':
            message = `Task '${task.title}' due date changed from ${previousState.dueDate} to ${updateTaskDto.dueDate}.`;
            break;
        }

        await this.activityLogService.logAction('update', 'task', id, message);
      }
    }

    return editTask;
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) throw new NotFoundException('Task not found');

    const removedTask = await this.taskRepository.delete(id);
    await this.activityLogService.logAction(
      'remove',
      'task',
      id,
      `Task '${task.title}' deleted.`,
    );

    return removedTask;
  }
}
