/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-27 17:09:38
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-10 16:33:26
 */
import { IsNumber, isString, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { Exclude } from "class-transformer";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @ApiProperty({ description: '用户名', example: 'test_user' })
    @IsString()
    userName: string;

    @Column({select:false})
    @ApiProperty({ description: '密码', example: 'test_password' })
    @IsString()
    password: string;
    
    @OneToMany(() => Post, post => post.user, { cascade: true })
    @ApiProperty({ description: '岗位', example: [{name:'作业员',workAge:3}] })
    posts: Post[]

}