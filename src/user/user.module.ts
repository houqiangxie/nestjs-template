import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './user.entity'
import {Post} from "./post.entity";
import { UserService } from './user.service';
import { UserController } from './user.controller';
@Module({
    imports: [TypeOrmModule.forFeature([User,Post])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
    
}