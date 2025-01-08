/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-27 17:09:05
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-07 14:28:46
 */
import { Body, Controller, Delete, Get, Post, ParseIntPipe,Param, Put, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { Post as PostEntity } from './post.entity'
import { ClassSerializerInterceptor } from "@nestjs/common";
@ApiTags('用户')
@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() user:User) {
        this.userService.create(user);
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id') id: string) {
        return new User({...await this.userService.findOne(id)});
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.userService.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: User) {
        this.userService.update(id, user);
    }

    @Put('/post/:id')
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