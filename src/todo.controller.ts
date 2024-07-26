import { Controller, Get } from "@nestjs/common";
import { TodoService } from "./todo.service";

@Controller()
export class TodoController {
  constructor(private readonly appService: TodoService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
