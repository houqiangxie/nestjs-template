/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-27 09:27:51
 * @LastEditors: houqiangxie
 * @LastEditTime: 2024-12-27 09:53:59
 */
import { Catch, HttpException, ExceptionFilter,ArgumentsHost } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException,host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        response.status(status).json({
            status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}