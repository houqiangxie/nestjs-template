import {Injectable} from '@nestjs/common';
const OpenAI = require("openai")
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat, Message } from './chat.entity';
@Injectable()
export class ChatService{
    private client
    constructor(
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
        @InjectRepository(Message) private messageRepository:Repository<Message>
    ) { }
    init() {
        this.client = new OpenAI({
            apiKey : "sk-8sz0b3QSXEYFpLbe830X36PuGYfuu4n7E0m6EzOinimio6Of", // 在这里将 MOONSHOT_API_KEY 替换为你从 Kimi 开放平台申请的 API Key
            baseURL: "https://api.moonshot.cn/v1",
        });
    }


// 我们定义一个全局变量 messages，用于记录我们和 Kimi 大模型产生的历史对话消息
// 在 messages 中，既包含我们向 Kimi 大模型提出的问题（role=user），也包括 Kimi 大模型给我们的回复（role=assistant）
// 当然，也包括初始的 System Prompt（role=system）
// messages 中的消息按时间顺序从小到大排列
// let messages = [
//     {
//         role: "system",
//         content: "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。",
//     },
    // ];
    async findOne(id) {
        return await this.chatRepository.findOne({ where: { id }, relations: ['messages'] })
    }

    async sendMessage(input, id) {
        let messages =[]
        if (id) {
            const chat = await this.findOne(id);
             messages =[...chat.messages];
        } else {
            this.chatRepository.save(this.chatRepository.create({messages:[]}))
        }
        messages.push({role: "user",content: input,});

        // 携带 messages 与 Kimi 大模型对话
        const completion = await this.client.chat.completions.create({
            model: "moonshot-v1-auto",
            messages: messages,
            temperature: 0.3,
            // stream:true,
        });

        // 通过 API 我们获得了 Kimi 大模型给予我们的回复消息（role=assistant）
        const assistantMessage = completion.choices[0].message;

        // 为了让 Kimi 大模型拥有完整的记忆，我们必须将 Kimi 大模型返回给我们的消息也添加到 messages 中
        messages.push(assistantMessage);
        const chatMessages = messages.map(message => !message.id && this.messageRepository.create(message));
        const chats = await this.findOne(id);
        this.chatRepository.save(Object.assign(chats,chatMessages));
        return assistantMessage.content;
    }

}


