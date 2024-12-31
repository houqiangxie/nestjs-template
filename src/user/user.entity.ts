import { IsNumber, isString, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:true})
    @ApiProperty({ description: '用户名', example: 'test_user' })
    @IsString()
    userName: string;

    @Column({ nullable: true })
    @ApiProperty({ description: '密码', example: 'test_password' })
    @IsString()
    password: string;
    
    @OneToMany(() => Post, post => post.user, { cascade: true })
    @ApiProperty({ description: '岗位', example: [{name:'作业员',workAge:3}] })
    posts: Post[]

}