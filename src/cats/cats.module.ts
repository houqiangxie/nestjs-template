import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cats.entity';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
@Module({
    imports: [TypeOrmModule.forFeature([CatEntity])],
    providers: [CatsService],
    controllers: [CatsController],
})
export class CatsModule {
    
}
