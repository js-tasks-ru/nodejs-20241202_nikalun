import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
      private _notificationService: NotificationsService,
      private _userService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const  { email } = this._userService.getUserById(assignedTo);

    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);
    const message = `Вы назначены ответственным за задачу: "${title}"`;

    this._notificationService.sendEmail(email, 'Новая задача', message);

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }
    const { phone } = this._userService.getUserById(task.assignedTo);
    const message = `Статус задачи "${task.title}" обновлён на "${updateTaskDto.status}"`;

    this._notificationService.sendSMS(phone, message);

    Object.assign(task, updateTaskDto);
    return task;
  }
}
