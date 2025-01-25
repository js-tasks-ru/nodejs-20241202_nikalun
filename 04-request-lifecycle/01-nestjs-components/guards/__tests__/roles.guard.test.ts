import { Test, TestingModule } from "@nestjs/testing";
import {
  INestApplication,
  Controller,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";
import * as request from "supertest";
import { RolesGuard } from "../roles.guard";

@Controller("mock")
class MockController {
  @Get()
  getMockData() {
    return { message: "GET request successful" };
  }

  @Post()
  @UseGuards(RolesGuard)
  postMockData() {
    return { message: "POST request successful" };
  }
}

describe("RolesGuard", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MockController],
      providers: [RolesGuard],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should allow access for GET request without role restriction", async () => {
    const response = await request(app.getHttpServer())
      .get("/mock")
      .expect(200);
    expect(response.body).toEqual({ message: "GET request successful" });
  });

  it("should deny access for POST request if role is not admin", async () => {
    const response = await request(app.getHttpServer())
      .post("/mock")
      .set("x-role", "user") // Simulate non-admin role
      .expect(403);

    expect(response.body).toEqual({
      statusCode: 403,
      message: "Доступ запрещён: требуется роль admin",
      error: "Forbidden",
    });
  });

  it("should deny access for POST request if JWT role empty or is not admin", async () => {
    const response = await request(app.getHttpServer())
        .post("/mock")
        .set("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c") // Simulate non-admin role
        .expect(403);

    expect(response.body).toEqual({
      statusCode: 403,
      message: "Доступ запрещён: требуется роль admin",
      error: "Forbidden",
    });
  });


  it("should allow access for POST request if role is admin", async () => {
    const response = await request(app.getHttpServer())
      .post("/mock")
      .set("x-role", "admin") // Simulate admin role
      .expect(201);

    expect(response.body).toEqual({ message: "POST request successful" });
  });


  it("should allow access for POST request jwt token contains role", async () => {
    const response = await request(app.getHttpServer())
        .post("/mock")
        .set("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.HEvMnFJ5dU18e-VvYEBVXvoY3lsYxf-Onel3RCfb0Bc") // Simulate admin role
        .expect(201);

    expect(response.body).toEqual({ message: "POST request successful" });
  });
});
