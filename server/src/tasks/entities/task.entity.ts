import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ActivityLog } from 'src/activity-log/entities/activity-log.entity';
import { TaskColumn } from 'src/task-columns/entities/task-column.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: string;

  @Column()
  dueDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => TaskColumn, (column) => column.tasks, {
    onDelete: 'CASCADE',
  })
  column: TaskColumn;

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.task, {
    cascade: true,
  })
  activityLogs: ActivityLog[];
}
