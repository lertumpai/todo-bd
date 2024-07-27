import { TodoEntity } from "./todo.entity";

export class TodoListEntity {
  private todoList: TodoEntity[] = [];

  add(todo: TodoEntity) {
    this.todoList.push(todo);
  }

  delete(id: string) {
    this.todoList = this.todoList.filter((t) => t.id !== id);
  }

  findById(id: string): TodoEntity {
    return this.todoList.find((t) => t.id === id);
  }

  getAll(): TodoEntity[] {
    return this.todoList;
  }
}
