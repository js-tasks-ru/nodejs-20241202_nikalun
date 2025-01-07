import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { QueryParamsValidator } from "./task.model";
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() query: QueryParamsValidator
  ) {
    return this.tasksService.getFilteredTasks(query);
  }
}
