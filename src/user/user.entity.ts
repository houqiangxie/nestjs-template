import { IsNumber, isString, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cat } from '../cats/cats.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    @ApiProperty({ description: '用户名', example: 'test_user' })
    @IsString()
    name: string;

    @Column()
    @ApiProperty({ description: '密码', example: 'test_password' })
    @IsString()
    age: string;
    

    @Column()
    @ApiProperty({ description: '品种', example: 'test_breed' })
    @IsString()
    breed: string;

    @OneToMany(() => Cat, cat => cat.user)
    cat: Cat

}