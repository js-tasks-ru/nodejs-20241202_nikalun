import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task) private _taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    await this._taskRepository.save(task);

    return task;
  }

  async findAll(limit?: number, page?: number) {
    return await this._taskRepository.find({
      take: limit,
      skip: page,
    });
  }

  async findOne(id: number) {
    const data = await this._taskRepository.findOne({ where: { id } });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const updateResult = await this._taskRepository.update(id, updateTaskDto);
    if (updateResult.affected) {
      return await this.findOne(id);
    }

    throw new NotFoundException();
  }

  async remove(id: number) {
    const deleteResult = await this._taskRepository.delete(id);
    if (deleteResult.affected) {
      return {
        message: "Task deleted successfully",
      }
    }

    throw new NotFoundException();
  }
}
