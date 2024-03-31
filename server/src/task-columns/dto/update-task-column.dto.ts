import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskColumnDto } from './create-task-column.dto';

export class UpdateTaskColumnDto extends PartialType(CreateTaskColumnDto) {}
