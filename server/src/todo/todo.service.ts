import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from '../entity/Task'
import { Repository } from 'typeorm'

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Task) private readonly tasks: Repository<Task>,
    ) {}

    async createTodo(name: string, userId: number) {
        const task = await this.tasks.create({ name, user: { id: userId } })
        await this.tasks.save(task)
        return task
    }

    async getTodos() {
        const tasks = await this.tasks.find()
        return tasks
    }

    async getTodosByUser(userId: number) {
        const tasks = await this.tasks.find({ user: { id: userId } })
        return tasks
    }

    async updateTask(id: number, params: Partial<Task>) {
        let task = await this.tasks.findOneOrFail(id)
        task = {
            ...task,
            ...params,
        }
        await this.tasks.save(task)
        return task
    }

    async deleteTask(id: number) {
        await this.tasks.delete(id)
    }
}
