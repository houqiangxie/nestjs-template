import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => Message, message => message.chat, { cascade: true })
    messages: Message[]
}

@Entity()
export class Message { 
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    content: string
    
    @Column()
    role: string

    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat
}