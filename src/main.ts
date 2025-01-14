/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-26 09:22:46
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-10 15:54:51
 */
import "reflect-metadata";
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
// import { JwtAuthGuard } from './common/guard/jwt-auth.guard';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
    // Swagger 配置
    const config = new DocumentBuilder()
      .setTitle('API 文档')
      .setDescription('基于 Swagger 自动生成的 API 文档')
      .setVersion('2.0')
      .addBearerAuth() // 如果需要认证
      .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      // 在 Swagger UI 中启用左侧目录
      docExpansion: 'none', // 默认为 'none'，即每个分组都是折叠的；可以设置为 'list' 展开
      filter: true, // 启用过滤功能，可以根据关键词搜索 API
      showRequestDuration: true, // 显示请求持续时间
      tagsSorter: 'alpha', // 按字母顺序排序标签
      },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用 class-transformer 转换
    }),
  );
  // jwt 鉴权
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtAuthGuard(reflector));

  // 全局异常
  app.useGlobalFilters(new GlobalExceptionFilter());
  // Serve uploaded files statically
  app.useStaticAssets(join(__dirname, '..', 'uploads')); // This serves files from the 'uploads' folder
  await app.listen(3000);
}
bootstrap();
