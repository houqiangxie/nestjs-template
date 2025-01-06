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
        const uploadPath = this.saveFile(file);
        const fileMetadata = new FileMetadata();
        fileMetadata.fileName = file.originalname;
        fileMetadata.fileUrl = uploadPath;
        fileMetadata.size = file.size;
        fileMetadata.mimeType = file.mimetype;
        
        await this.fileRepository.save(fileMetadata);
        return {
            message: '文件上传成功',
            fileMetadata,
        };
    }
    saveFile(file: Express.Multer.File) {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const directory = `${year}${month}`;
        const uploadPath = path.join(__dirname, '..', 'uploads', directory, file.originalname);

        if (!fs.existsSync(path.join(__dirname, '..', 'uploads', directory))) {
            fs.mkdirSync(path.join(__dirname, '..', 'uploads', directory), { recursive: true });
        }
        // const ext = path.extname(file.originalname); // Get file extension
        // const filename = path.basename(file.originalname, ext); // Get file name without extension
        // const newFilePath = path.join(__dirname, '..', 'uploads', directory, `${filename}-${Date.now()}${ext}`); // Construct new file path with extension
        
        fs.renameSync(file.path, uploadPath); // Rename to move the file
        return uploadPath; // Return the file path
    }

    async getFileMetadata(id: string) {
        return await this.fileRepository.findOne({ where: { id } });
    }

    async getAllFiles() {
        return this.fileRepository.find();
    }
}
