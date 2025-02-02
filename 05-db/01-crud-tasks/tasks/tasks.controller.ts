import { Controller, Get, Post, Patch, Delete, Body, Query, Param, ParseIntPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }

  @Get()
  findAll(
      @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
      @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  ) {
    return this.tasksService.findAll(limit, page);
  }

  @Get(":id")
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDto) {
    return this.tasksService.update(id, data);
  }

  @Delete(":id")
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
