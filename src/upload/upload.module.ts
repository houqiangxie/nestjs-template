import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {FileMetadata} from './file.entity'
@Module({
    imports: [TypeOrmModule.forFeature([FileMetadata])],
    controllers: [UploadController],
    providers: [UploadService],
})

export class UploadModule {
    
}