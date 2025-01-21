import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
      JwtModule.register({ secret: 'your-256-bit-secret' }),
      TasksModule
  ],
})
export class AppModule {}
