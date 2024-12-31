import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileMetadata } from './file.entity'; // Import the FileMetadata entity
import * as path from 'path';

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(FileMetadata)
        private fileRepository: Repository<FileMetadata>,
    ) { }

    async saveFileMetadata(file: Express.Multer.File): Promise<FileMetadata> {
        const fileMetadata = new FileMetadata();
        fileMetadata.fileName = file.originalname;
        fileMetadata.fileUrl = path.join(__dirname, '..', 'uploads', file.filename);
        fileMetadata.size = file.size;
        fileMetadata.mimeType = file.mimetype;

        return this.fileRepository.save(fileMetadata);
    }
}
