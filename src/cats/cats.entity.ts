/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-27 16:51:10
 * @LastEditors: houqiangxie
 * @LastEditTime: 2024-12-30 15:50:28
 */
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Cat {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    @ApiProperty({ description: '用户名', example: 'test_user' })
    @IsString()
    name: string;
    
    @Column()
    @ApiProperty({ description: '年龄', example: 18 })
    @IsNumber()
    age: number;

    @Column()
    @ApiProperty({ description: '品种', example: 'test_breed' })
    @IsString()
    breed: string;

}