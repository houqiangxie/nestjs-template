/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-27 16:51:10
 * @LastEditors: houqiangxie
 * @LastEditTime: 2024-12-27 16:57:16
 */
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CatEntity {

    @PrimaryGeneratedColumn()
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