/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2025-01-09 16:01:25
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-10 11:25:30
 */
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ChatService } from "./chat.service";
import { Post, Body } from "@nestjs/common";


@ApiTags('chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }
    @Post('chat')
    async chat(@Body() message: string,@Body() id: string) {
        if (!message) {
            return { error: 'Message is required' };
        }
        const response = await this.chatService.sendMessage(message,id);
        return {
            userMessage: message,
            kimiResponse: response,
        };
    }
}