import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { Task } from 'src/entity/Task'
import { SecurityGuard } from '../guards/security.guard'

@Controller('todos')
@UseGuards(SecurityGuard)
export class TodoController {
    constructor(private readonly service: TodoService) {}

    @Post()
    async create(@Body('name') name: string, @Body('userId') userId: number) {
        const task = await this.service.createTodo(name, userId)
        return task
    }

    @Get()
    async getUsers(@Query('user') userId: number) {
        const tasks = await this.service.getTodosByUser(userId)
        return tasks
    }

    @Get()
    async getAll() {
        const tasks = await this.service.getTodos()
        return tasks
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() fields: Partial<Task>) {
        const task = await this.service.updateTask(id, fields)
        return task
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.service.deleteTask(id)
    }
}
