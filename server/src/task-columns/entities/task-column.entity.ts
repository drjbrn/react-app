import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { ActivityLog } from 'src/activity-log/entities/activity-log.entity';

@Entity()
export class TaskColumn {
  @PrimaryGeneratedColumn({ name: 'column_id' })
  id: number;

  @Column({ name: 'column_title' })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Task, (task) => task.column, { onDelete: 'CASCADE' })
  tasks: Task[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.task, {
    cascade: true,
  })
  activityLogs: ActivityLog[];
}
