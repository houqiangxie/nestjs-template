/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-27 17:09:05
 * @LastEditors: houqiangxie
 * @LastEditTime: 2024-12-27 17:25:18
 */
import { Body, Controller, Delete, Get, Post, ParseIntPipe,Param, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "./user.entity";
@ApiTags('用户')
@Controller('user')
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
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        this.userService.remove(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
        this.userService.update(id, user);
    }
}