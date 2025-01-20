import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { LoggerService } from "../logger/logger.service";

@Module({
  imports: [],
  exports: [NotificationsService],
  providers: [NotificationsService, LoggerService],
})
export class NotificationsModule {}
