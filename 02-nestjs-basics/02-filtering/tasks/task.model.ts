import { IsEnum, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
}

enum SortByFields {
  id = 'id',
  description = 'description',
}

export interface QueryParams {
  status?: TaskStatus;
  page?: number;
  limit?: number;
  sortBy?: SortByFields;
}

export class QueryParamsValidator implements QueryParams {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  page?: number;
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  limit?: number;
  @IsEnum(SortByFields)
  sortBy?: SortByFields;
}
