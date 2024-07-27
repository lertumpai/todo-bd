import { Injectable } from "@nestjs/common";
import { TodoListEntity } from "./todoList.entity";
import { TodoEntity } from "./todo.entity";
import { CreateTodoPayload, UpdateTodoPayload } from "./todo.payload";

@Injectable()
export class TodoService {
  private todoList: TodoListEntity;

  constructor() {
    this.todoList = new TodoListEntity();
  }

  create(payload: CreateTodoPayload): void {
    const todo = new TodoEntity({
      title: payload.title,
      note: payload.note,
    });
    this.todoList.add(todo);
  }

  delete(id: string): void {
    this.todoList.remove(id);
  }

  complete(id: string): void {
    const todo = this.todoList.findById(id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    todo.complete();
  }

  update(payload: UpdateTodoPayload): void {
    const todo = this.todoList.findById(payload.id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    todo.update({
      title: payload.title,
      note: payload.note,
    });
  }

  getAll(): TodoEntity[] {
    return this.todoList.getAll();
  }
}
