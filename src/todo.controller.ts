import { Body, Controller, Get, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoDTO } from "./todo.dto";

@Controller("v1/todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  get() {
    console.log("123");
    return this.todoService.getAll();
  }

  @Post()
  create(@Body() body: TodoDTO) {
    return this.todoService.create({
      title: body.title,
      note: body.note,
    });
  }
}
