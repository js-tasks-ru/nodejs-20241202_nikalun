import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { validateTask } from "./validators";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: Task) {
    const errors = validateTask(task);

    if (!!errors?.isError) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.fields,
      }, HttpStatus.NOT_FOUND);
    }

    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: Task) {
    const errors = validateTask(task);

    if (!!errors?.isError) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.fields,
      }, HttpStatus.NOT_FOUND);
    }

    return this.tasksService.updateTask(id, task);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }
}
