import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
    @ApiProperty({ description: '用户名', example: 'test_user' })
    @IsString()
    name: string;
    
    @ApiProperty({ description: '年龄', example: 18 })
    @IsNumber()
    age: number;

    @ApiProperty({ description: '品种', example: 'test_breed' })
    @IsString()
    breed: string;

}