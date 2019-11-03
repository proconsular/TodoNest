import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @Column({ default: false })
    public complete: boolean

    @ManyToOne(type => User, user => user.tasks, { onDelete: 'CASCADE' })
    public user: User
}
