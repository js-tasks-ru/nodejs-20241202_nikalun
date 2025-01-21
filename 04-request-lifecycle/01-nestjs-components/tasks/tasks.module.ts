import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { LoggingMiddleware } from "../middlewares/logging.middleware";
import { RolesGuard } from "../guards/roles.guard";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService, RolesGuard],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes("tasks");
  }
}
