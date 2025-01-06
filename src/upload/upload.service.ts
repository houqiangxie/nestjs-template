import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileMetadata } from './file.entity'; // Import the FileMetadata entity
import * as path from 'path';
import * as fs from 'fs';
import { Express } from 'express';
@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(FileMetadata)
        private fileRepository: Repository<FileMetadata>,
    ) { }

    async saveFileMetadata(file: Express.Multer.File) {
        const fileMetadata = new FileMetadata();
        fileMetadata.fileName = file.originalname;
        fileMetadata.fileUrl = path.join(__dirname, '..', 'uploads', file.filename);
        fileMetadata.size = file.size;
        fileMetadata.mimeType = file.mimetype;
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
    saveFile(file: Express.Multer.File) {
        const uploadPath = path.join(__dirname, '..', 'uploads', file.filename);

        // Save file, process, or move it to a different directory
        fs.renameSync(file.path, uploadPath); // Rename to move the file
        return uploadPath; // Return the file path
    }
}
