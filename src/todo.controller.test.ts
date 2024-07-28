import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { TodoDTO } from "./todo.dto";
import { TodoModule } from "./todo.module";

describe("TodoController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TodoModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("v1/todos (GET)", async () => {
    await request(app.getHttpServer()).get("v1/todos").expect(200).expect([]);
  });

  it("/todos/:id (GET)", () => {
    const todoId = "1";
    return request(app.getHttpServer())
      .get(`/todos/${todoId}`)
      .expect(200)
      .expect({
        id: todoId,
        title: "title",
        note: "note",
      });
  });

  it("/todos (POST)", () => {
    const dto: TodoDTO = { title: "Test", note: "Test note" };
    return request(app.getHttpServer())
      .post("/todos")
      .send(dto)
      .expect(201)
      .expect({
        message: "Todo created",
      });
  });

  it("/todos/:id/complete (PATCH)", () => {
    const todoId = "1";
    return request(app.getHttpServer())
      .patch(`/todos/${todoId}/complete`)
      .expect(200)
      .expect({
        message: "Todo completed",
      });
  });

  it("/todos/:id (PUT)", () => {
    const todoId = "1";
    const dto: TodoDTO = { title: "Updated title", note: "Updated note" };
    return request(app.getHttpServer())
      .post(`/todos/${todoId}`)
      .send(dto)
      .expect(200)
      .expect({
        message: "Todo updated",
      });
  });

  it("/todos/:id (DELETE)", () => {
    const todoId = "1";
    return request(app.getHttpServer())
      .delete(`/todos/${todoId}`)
      .expect(200)
      .expect({
        message: "Todo deleted",
      });
  });
});
