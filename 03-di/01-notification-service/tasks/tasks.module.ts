import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersService } from "../users/users.service";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService, NotificationsService, UsersService, LoggerService],
})
export class TasksModule {}
