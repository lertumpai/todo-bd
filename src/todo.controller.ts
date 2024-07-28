import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoDTO } from "./todo.dto";

@Controller("v1/todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll() {
    return this.todoService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.todoService.getOne(id);
  }

  @Post()
  create(@Body() body: TodoDTO) {
    this.todoService.create({
      title: body.title,
      note: body.note,
    });
    return { message: "Todo created" };
  }

  @Post(":id/completion")
  complete(@Param("id") id: string) {
    this.todoService.complete(id);
    return { message: "Todo completed" };
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: TodoDTO) {
    this.todoService.update({
      id: id,
      title: body.title,
      note: body.note,
    });
    return { message: "Todo updated" };
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    this.todoService.delete(id);
    return { message: "Todo deleted" };
  }
}
