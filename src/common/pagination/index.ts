/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2025-01-08 17:03:53
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-08 17:49:45
 */
import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty({ description: '当前页码', default: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number = 1;

    @ApiProperty({ description: '每页数量', default: 10 })
    @IsOptional()
    @IsInt()
    @Min(1)
    pageSize: number = 10;

    @ApiProperty({ description: '搜索关键词', required: false })
    @IsOptional()
    search?: string;

    @ApiProperty({ description: '排序字段', required: false })
    @IsOptional()
    sort?: string;

    @ApiProperty({ description: '排序方向', default: 'ASC', enum: ['ASC', 'DESC'] })
    @IsOptional()
    order?: 'ASC' | 'DESC' = 'ASC';
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}


import { SelectQueryBuilder } from 'typeorm';

export async function paginate<T>(
    query: SelectQueryBuilder<T>,
    paginationDto: PaginationDto,
): Promise<PaginatedResult<T>> {
    const { page, pageSize, sort, order, search } = paginationDto;

    if (search) {
        // 假设有字段 'name' 用于搜索，可根据实际需求调整
        query.andWhere('name LIKE :search', { search: `%${search}%` });
    }

    if (sort) {
        query.orderBy(sort, order || 'ASC');
    }

    const total = await query.getCount();
    const data = await query
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getMany();

    return {
        data,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    };
}


