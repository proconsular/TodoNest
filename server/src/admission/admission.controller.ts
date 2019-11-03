import {
    Controller,
    Post,
    Body,
    Put,
    Delete,
    Param,
    UseGuards,
} from '@nestjs/common'
import { AdmissionService } from './admission.service'
import { SecurityGuard } from '../guards/security.guard'

@Controller('admission')
export class AdmissionController {
    constructor(private readonly service: AdmissionService) {}

    @Post()
    signup(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        const user = this.service.createUser(username, password)
        return user
    }

    @Put()
    signin(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        const id = this.service.signinUser(username, password)
        return id
    }

    @Delete(':id')
    signout(@Param('id') id: number) {
        this.service.signoutUser(id)
    }
}
