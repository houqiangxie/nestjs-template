/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-26 17:33:32
 * @LastEditors: houqiangxie
 * @LastEditTime: 2024-12-27 09:11:18
 */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request, Response } from "express";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        next();
    }
}