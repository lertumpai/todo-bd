import { Injectable, NotFoundException } from "@nestjs/common";
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

  remove(id: string): void {
    this.todoList.delete(id);
  }

  complete(id: string): void {
    const todo = this.todoList.findById(id);

    if (!todo) {
      throw new NotFoundException(`Todo id=${id} not found`);
    }

    todo.complete();
  }

  update(payload: UpdateTodoPayload): void {
    const todo = this.todoList.findById(payload.id);

    if (!todo) {
      throw new NotFoundException(`Todo id=${payload.id} not found`);
    }

    todo.update({
      title: payload.title,
      note: payload.note,
    });
  }

  getAll(): TodoEntity[] {
    return this.todoList.getAll();
  }

  getOne(id: string): TodoEntity {
    return this.todoList.findById(id);
  }
}
