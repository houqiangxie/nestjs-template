/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-31 17:10:33
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-06 09:05:31
 */
import { SetMetadata } from '@nestjs/common';

// This decorator will be used to mark public routes
export const Public = () => SetMetadata('isPublic', true);

// @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs @nestjs/platform-express multer