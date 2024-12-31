import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllExceptionFilter } from './common/filter/all-exception.filter';
// import { ValidationPipe } from './common/pipe/validation.pipe';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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
      // 自定义 CSS 文件路径
      // customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.50.0/swagger-ui.css',
      // customJs: `
      // const customJs = function() {
      //     document.querySelector('.swagger-ui .topbar').style.backgroundColor = '#00f';
      //   }
      //   customJs();
      // `,
      },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用 class-transformer 转换
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(3000);
}
bootstrap();
