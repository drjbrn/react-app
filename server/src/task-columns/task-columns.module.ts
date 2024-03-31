import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskColumnsService } from './task-columns.service';
import { TaskColumnsController } from './task-columns.controller';
import { TaskColumn } from './entities/task-column.entity';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskColumn]), ActivityLogModule],
  controllers: [TaskColumnsController],
  providers: [TaskColumnsService],
  exports: [TaskColumnsService],
})
export class TaskColumnsModule {}
