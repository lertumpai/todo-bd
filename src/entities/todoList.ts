import { Todo } from "./todo";

export class TodoList {
  private todoList: Todo[] = [];

  add(todo: Todo) {
    this.todoList.push(todo);
  }

  remove(todo: Todo) {
    this.todoList = this.todoList.filter((t) => t.id !== todo.id);
  }

  findById(id: number) {
    return this.todoList.find((t) => t.id === id);
  }

  getAll() {
    return this.todoList;
  }
}
