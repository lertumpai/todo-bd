import { Test, TestingModule } from "@nestjs/testing";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TodoDTO } from "./todo.dto";

describe("TodoController", () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([]),
            getOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue(undefined),
            complete: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it("should be defined", () => {
    expect(todoController).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array of todos", async () => {
      const result = [];
      jest.spyOn(todoService, "getAll").mockResolvedValue(result);
      expect(await todoController.getAll()).toBe(result);
    });
  });

  describe("getOne", () => {
    it("should return a single todo", async () => {
      const result = {};
      jest.spyOn(todoService, "getOne").mockResolvedValue(result);
      expect(await todoController.getOne("1")).toBe(result);
    });
  });

  describe("create", () => {
    it("should create a new todo", async () => {
      const dto: TodoDTO = { title: "Test", note: "Test note" };
      expect(await todoController.create(dto)).toEqual({
        message: "Todo created",
      });
      expect(todoService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("complete", () => {
    it("should complete a todo", async () => {
      expect(await todoController.complete("1")).toEqual({
        message: "Todo completed",
      });
      expect(todoService.complete).toHaveBeenCalledWith("1");
    });
  });

  describe("update", () => {
    it("should update a todo", async () => {
      const dto: TodoDTO = { title: "Updated title", note: "Updated note" };
      expect(await todoController.update("1", dto)).toEqual({
        message: "Todo updated",
      });
      expect(todoService.update).toHaveBeenCalledWith({ id: "1", ...dto });
    });
  });

  describe("delete", () => {
    it("should delete a todo", async () => {
      expect(await todoController.delete("1")).toEqual({
        message: "Todo deleted",
      });
      expect(todoService.delete).toHaveBeenCalledWith("1");
    });
  });
});
