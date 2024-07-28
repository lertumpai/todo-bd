import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { TodoDTO } from "./todo.dto";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

describe("TodoController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("HTTP GET", () => {
    it("v1/todos (GET): should return list todos", async () => {
      await request(app.getHttpServer())
        .get("/v1/todos")
        .expect(200)
        .expect([]);
    });

    it("/v1/todos/:id (GET): should return todo", async () => {
      // create new todo
      const dto: TodoDTO = { title: "title", note: "note" };
      await request(app.getHttpServer())
        .post("/v1/todos")
        .send(dto)
        .expect(201)
        .expect({
          message: "Todo created",
        });

      // get list todo for get todoId
      const res = await request(app.getHttpServer()).get("/v1/todos");

      const todoId = res.body[0].id;
      const result = await request(app.getHttpServer())
        .get(`/v1/todos/${todoId}`)
        .expect(200);

      expect(result.body.title).toBe("title");
      expect(result.body.note).toBe("note");
    });
  });

  describe("HTTP POST", () => {
    it("/v1/todos (POST): should creat new todo", () => {
      const dto: TodoDTO = { title: "Test", note: "Test" };
      return request(app.getHttpServer())
        .post("/v1/todos")
        .send(dto)
        .expect(201)
        .expect({
          message: "Todo created",
        });
    });
  });

  describe("HTTP PATCH", () => {
    it("/v1/todos/:id (PATCH): should update todo", async () => {
      // create new todo
      const createDto: TodoDTO = { title: "title", note: "note" };
      await request(app.getHttpServer())
        .post("/v1/todos")
        .send(createDto)
        .expect(201)
        .expect({
          message: "Todo created",
        });

      // get list todo for get todoId
      const res = await request(app.getHttpServer()).get("/v1/todos");

      // update
      const todoId = res.body[0].id;
      const updateDto: TodoDTO = {
        title: "Updated title",
        note: "Updated note",
      };
      await request(app.getHttpServer())
        .patch(`/v1/todos/${todoId}`)
        .send(updateDto)
        .expect(200)
        .expect({
          message: "Todo updated",
        });

      // test updated title and note
      const result = await request(app.getHttpServer())
        .get(`/v1/todos/${todoId}`)
        .expect(200);
      expect(result.body.title).toBe("Updated title");
      expect(result.body.note).toBe("Updated note");
    });

    it("/v1/todos/:id/complete (PATCH)", async () => {
      // create new todo
      const createDto: TodoDTO = { title: "title", note: "note" };
      await request(app.getHttpServer())
        .post("/v1/todos")
        .send(createDto)
        .expect(201)
        .expect({
          message: "Todo created",
        });

      // get list todo for get todoId
      const res = await request(app.getHttpServer()).get("/v1/todos");

      // update
      const todoId = res.body[0].id;
      await request(app.getHttpServer())
        .patch(`/v1/todos/${todoId}/completion`)
        .expect(200)
        .expect({
          message: "Todo completed",
        });

      // test completedAt
      const result = await request(app.getHttpServer())
        .get(`/v1/todos/${todoId}`)
        .expect(200);
      expect(result.body.completedAt).not.toBeNull();
    });
  });

  describe("HTTP DELETE /v1/todos/:id (DELETE)", () => {
    it("should remove todo", async () => {
      // create new todo
      const createDto: TodoDTO = { title: "title", note: "note" };
      await request(app.getHttpServer())
        .post("/v1/todos")
        .send(createDto)
        .expect(201)
        .expect({
          message: "Todo created",
        });

      // get list todo for get todoId
      const res = await request(app.getHttpServer()).get("/v1/todos");

      // update
      const todoId = res.body[0].id;
      await request(app.getHttpServer())
        .delete(`/v1/todos/${todoId}`)
        .expect(200)
        .expect({
          message: "Todo deleted",
        });

      // test deleted
      await request(app.getHttpServer()).get(`/v1/todos/${todoId}`).expect({});
    });
  });
});
