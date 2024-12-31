import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileMetadata } from './file.entity'; // Import the FileMetadata entity
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';

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
        @InjectRepository(FileMetadata)
        private fileRepository: Repository<FileMetadata>, // Inject FileMetadata repository to save file info in DB
    ) { }

    @Post('single')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload a single image file',
        type: 'multipart/form-data',
    })
    @UseInterceptors(FileInterceptor('file', multerOptions)) // Handle file upload with multer
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        // Log file information for debugging
        // Prepare file metadata to be saved in the database
        const fileMetadata = new FileMetadata();
        fileMetadata.fileName = file.originalname;
        fileMetadata.fileUrl = path.join(__dirname, '..', 'uploads', file.filename);
        fileMetadata.size = file.size;
        fileMetadata.mimeType = file.mimetype;

        // Save the file metadata in the database
        await this.fileRepository.save(fileMetadata);

        return {
            message: '文件上传成功',
            fileMetadata: {
                id: fileMetadata.id,
                fileName: fileMetadata.fileName,
                fileUrl: fileMetadata.fileUrl,
                size: fileMetadata.size,
                mimeType: fileMetadata.mimeType,
            },
        };
    }
}
