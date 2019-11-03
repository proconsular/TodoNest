import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Task } from './Task'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public username: string

    @Column()
    public password: string

    @Column({ default: false })
    public online: boolean

    @Column({ default: '' })
    public token: string

    @OneToMany(type => Task, task => task.user, { onDelete: 'CASCADE' })
    public tasks: Task[]
}
