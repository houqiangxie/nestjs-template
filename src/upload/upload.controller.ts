import { Controller, Get, Post, Param, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import { UploadService } from './upload.service';

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

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post('single')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: '选择文件上传',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            const result = await this.uploadService.saveFileMetadata(file);
            return { message: '文件上传成功', data: result };
        } catch (error) {
            throw new Error('文件上传失败: ' + error.message);
        }
    }

    @Get('file/allFile')
    async getAllFiles() {
        return await this.uploadService.getAllFiles();
    }

    @Get('file/:id')
    async getFile(@Param('id') id: string, @Res() res: Response) {
        try {
            const file = await this.uploadService.getFileMetadata(id);
            const filePath = file.fileUrl;

            if (fs.existsSync(filePath)) {
                res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
                res.setHeader('Content-Type', 'application/octet-stream');
                const fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);
            } else {
                res.status(404).send({ message: 'File not found' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error retrieving file', error: error.message });
        }
    }
}
