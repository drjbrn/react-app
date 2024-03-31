import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { TaskColumnsModule } from 'src/task-columns/task-columns.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    ActivityLogModule,
    TaskColumnsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule],
})
export class TasksModule {}
