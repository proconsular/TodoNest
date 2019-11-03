import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entity/User'
import { Repository } from 'typeorm'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AdmissionService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
    ) {}

    async createUser(username: string, password: string) {
        const hash = await bcrypt.hash(password, 10)
        const user = await this.users.create({ username, password: hash })
        await this.users.save(user)
        return { id: user.id, username }
    }

    async signinUser(username: string, password: string) {
        const user = await this.users.findOneOrFail({ username })
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new Error('Unauthorized.')
        }
        const token = jwt.sign({ username: user.username, password: user.password }, '123', {
            expiresIn: '4h',
        })
        user.online = true
        user.token = token
        await this.users.save(user)
        return { id: user.id, username: user.username, token }
    }

    async signoutUser(id: number) {
        const user = await this.users.findOneOrFail(id)
        user.online = false
        await this.users.save(user)
    }
}
