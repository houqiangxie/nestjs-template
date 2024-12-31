import { IsNumber, isString, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @ApiProperty({ description: '岗位名称', example: '作业员' })
    @IsString()
    name: string;

    @Column()
    @ApiProperty({ description: '密码', example: 3 })
    @IsNumber()
    workAge: number;
    

    @ManyToOne(() => User, user => user.posts)
    user: User

}