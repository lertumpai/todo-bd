import { v4 as uuidV4 } from "uuid";

type TodoType = {
  title: string;
  note: string;
};

export class TodoEntity {
  public readonly id: string;
  public title: string;
  public note: string;
  public completedAt: Date;
  public createAt: Date;
  public updatedAt: Date;

  constructor(todo: TodoType) {
    this.id = uuidV4();
    this.title = todo.title;
    this.note = todo.note;
    this.createAt = new Date();
    this.updatedAt = new Date();
  }

  public complete() {
    this.completedAt = new Date();
  }

  public update(todo: TodoType) {
    this.title = todo.title || this.title;
    this.note = todo.note || this.note;
    this.updatedAt = new Date();
  }
}
