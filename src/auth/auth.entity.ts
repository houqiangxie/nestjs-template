import { IsNumber, isString, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Auth {


    @ApiProperty({ description: '用户名', example: 'test_user' })
    @IsString()
    userName: string;

    @ApiProperty({ description: '密码', example: 'test_password' })
    @IsString()
    password: string;
    
}