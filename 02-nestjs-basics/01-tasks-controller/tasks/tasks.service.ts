import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string) {
    const task = this.tasks.find(item => item.id === id);
    if (!task) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Такого элемента не существует',
      }, HttpStatus.NOT_FOUND);
    }

    return task;
  }

  createTask(task: Task) {
    const createdTask = {
        ...task,
        id: String(this.tasks.length + 1),
    }
    this.tasks.push(createdTask);
    return createdTask;
  }

  updateTask(id: string, update: Task) {
      const index = this.tasks.findIndex(item => item.id === id);

   if (index === -1) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Такого элемента не существует',
      }, HttpStatus.NOT_FOUND);
    }

    const updatedTask: Task = {
      id,
      ...update,
    }

    this.tasks.splice(index, 1, updatedTask);

    return updatedTask;
  }

  deleteTask(id: string) {
    const index = this.tasks.findIndex(item => item.id === id);

    if (index === -1) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Такого элемента не существует',
      }, HttpStatus.NOT_FOUND);
    }

    const deleted = this.tasks[index];
    this.tasks.splice(index, 1);

    return deleted;
  }
}
