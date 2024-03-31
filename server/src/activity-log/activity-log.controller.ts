import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLog } from './entities/activity-log.entity';

@Controller('activity-log')
export class ActivityLogController {
  constructor(private activityLogService: ActivityLogService) {}

  @Get()
  async getActivityLogs(): Promise<ActivityLog[]> {
    return await this.activityLogService.getAllActivityLogs();
  }

  @Get('tasks/:taskId')
  async getTaskActivityLogs(
    @Param('taskId') taskId: number,
  ): Promise<ActivityLog[]> {
    return await this.activityLogService.getTaskActivityLogsById(taskId);
  }

  @Delete()
  async clearHistory() {
    return await this.activityLogService.clearActivityLogs();
  }
}
