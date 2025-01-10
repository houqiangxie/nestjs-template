import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat,Message } from "./chat.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Chat, Message])],
    controllers: [ChatController],
    providers: [ChatService],
})

export class ChatModule {}