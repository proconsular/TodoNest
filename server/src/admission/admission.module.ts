import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AdmissionService } from './admission.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entity/User'
import { AdmissionController } from './admission.controller'
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AdmissionService],
    controllers: [AdmissionController],
})
export class AdmissionModule {}
