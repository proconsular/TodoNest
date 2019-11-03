import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdmissionController } from './admission/admission.controller'
import { AdmissionModule } from './admission/admission.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { TodoModule } from './todo/todo.module'

@Module({
    imports: [TypeOrmModule.forRoot(), AdmissionModule, TodoModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
