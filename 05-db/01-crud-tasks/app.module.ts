import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./tasks/tasks.module";
import { Task } from "./tasks/entities/task.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: 'db.sqlite',
      entities: [Task],
      //synchronize: true,
    }),
    TasksModule],
})
export class AppModule {}
