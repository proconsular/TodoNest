import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entity/User'
import * as jwt from 'jsonwebtoken'
import { Request } from 'express'

@Injectable()
export class SecurityGuard implements CanActivate {
    constructor(@InjectRepository(User) private users: Repository<User>) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest() as Request
        const token = request.headers.authorization.split(' ')[1]
        if (token) {
            const user = this.users.findOneOrFail({ token })
            return user.then(record => {
                const decoded = jwt.verify(token, '123') as any
                if (record.username === decoded.username && record.online) {
                    return true
                }
            }).catch(() => {
                return false
            })
        } else {
            return Promise.resolve(false)
        }
    }
}
