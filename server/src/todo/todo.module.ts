import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoController } from './todo.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from '../entity/Task'
import { User } from '../entity/User'

@Module({
    imports: [TypeOrmModule.forFeature([Task, User])],
    providers: [TodoService],
    controllers: [TodoController],
})
export class TodoModule {}
