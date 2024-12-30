import { IsNumber, isString, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
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

}