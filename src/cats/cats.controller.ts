import { Controller, Get, Req, Post, HttpCode, Header, Redirect, Query, Param, Body, Res, HttpStatus, Delete, Put, UseFilters, ForbiddenException, ParseIntPipe, UsePipes } from '@nestjs/common';
import { CatsService } from './cats.service';
import {Cat}from './cats.entity'
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';
import { ValidationPipe } from '../common/pipe/validation.pipe';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('cats test')
@Controller('cats')
// @UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}
    @Get()
    async findAll(@Req() req: Request, @Res({ passthrough: true }) res): Promise<Cat[]> {
        res.status(HttpStatus.OK)
        return this.catsService.findAll();
    }

    @Post()
    // @HttpCode(204)
        // @Header('Cache-Control', 'none')
    @ApiOperation({ summary: '更新信息', description: '用户通过此接口更新信息' })
    @ApiResponse({ status: 201, description: '更新成功' })
    @ApiResponse({ status: 400, description: '参数错误' })
    async create(@Body() Cat: Cat, @Res({ passthrough: true }) res) {
        this.catsService.create(Cat);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id): Promise<Cat> {
        return this.catsService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id) {
        this.catsService.remove(id);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() updateCatDto: Cat) {
         this.catsService.update(id, updateCatDto);
    }


    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version): any {
        if(version && version === '5'){
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }
    
    @Get('async')
    async findAsync(): Promise<any[]> {
        return ['This action await  returns all cats'];
    }

    

}
