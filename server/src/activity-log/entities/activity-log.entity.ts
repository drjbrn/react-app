import { TaskColumn } from 'src/task-columns/entities/task-column.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column()
  entityType: string;

  @Column()
  entityId: number;

  @Column()
  details: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => Task, (task) => task.activityLogs)
  task: Task;

  @ManyToOne(() => TaskColumn, (column) => column.activityLogs)
  column: TaskColumn;
}
