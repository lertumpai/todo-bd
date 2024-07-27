type TodoType = {
  id: number;
  title: string;
  note: string;
};

export class Todo {
  public readonly id: number;
  public title: string;
  public note: string;
  public completedAt: Date;
  public createAt: Date;
  public updatedAt: Date;

  constructor(todo: TodoType) {
    this.id = todo.id;
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
