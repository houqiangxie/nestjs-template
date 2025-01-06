import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileMetadata } from './file.entity'
import { UploadService } from './upload.service';
import { Express } from 'express';

// Multer options for file upload configuration
const multerOptions = {
    dest: './uploads', // Directory to store uploaded files
    limits: {
        fileSize: 10 * 1024 * 1024, // Max file size: 10MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    },
};

@ApiTags('File Upload')
@Controller('upload')
export class UploadController {
    constructor(
        private uploadService: UploadService, // Inject the UploadService to handle file upload
    ) { }

    @Post('single')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload a single image file',
        type: 'multipart/form-data',
    })
    @UseInterceptors(FileInterceptor('file', multerOptions)) // Handle file upload with multer
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.uploadService.saveFileMetadata(file)
    }
}
