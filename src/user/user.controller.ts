/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-27 17:09:05
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-10 16:34:55
 */
import { Body, Controller, Delete, Get, Post, ParseIntPipe,Param, Put, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { Post as PostEntity } from './post.entity'
import { ClassSerializerInterceptor } from "@nestjs/common";
import {Public}from 'src/common/decorator/public.decorator'
import { plainToInstance } from "class-transformer";
@ApiTags('用户')
@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Public()
    async findAll() {
        return await this.userService.findAll()
    }

    @Post()
    create(@Body() user:User) {
        this.userService.create(user);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.findOne(id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.userService.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: User) {
        this.userService.update(id, user);
    }

    @Put('/post')
    updatePost(@Param('id') id: string, @Body() post: PostEntity) {
        this.userService.updatePost(id, post);
    }

    @Delete('/post/:postId')
    removePost(@Param('postId') postId: string) {
        this.userService.removePostByPostId(postId);
    }

    @Get('/post/:id')
    findPostByUserId(@Param('id') id: string) {
        return this.userService.findOne(id).then(user => user.posts);
    }
}