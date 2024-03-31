import { TaskColumn } from 'src/task-columns/entities/task-column.entity';

export class CreateTaskDto {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  column: TaskColumn;
}
