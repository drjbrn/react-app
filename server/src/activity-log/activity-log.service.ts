import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private activityLogRepository: Repository<ActivityLog>,
  ) {}

  async logAction(
    action: string,
    entityType: string,
    entityId: number,
    details: string,
  ): Promise<ActivityLog> {
    const logEntry = this.activityLogRepository.create({
      action,
      entityType,
      entityId,
      details,
    });
    return await this.activityLogRepository.save(logEntry);
  }

  async getAllActivityLogs(): Promise<ActivityLog[]> {
    return await this.activityLogRepository.find();
  }

  async getTaskActivityLogsById(taskId: number): Promise<ActivityLog[]> {
    return await this.activityLogRepository.find({
      where: { entityId: taskId, entityType: 'task' },
    });
  }

  async clearActivityLogs() {
    return await this.activityLogRepository.clear();
  }
}
