import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
    ) { }
    async getMessages(): Promise<Message[]> {
        return await this.messagesRepository.find({ relations: ['relation'] });
    }
    async getMessage(_id: number): Promise<Message[]> {
        return await this.messagesRepository.find({
            relations: ['relation'],
            select: ['relation', 'message', 'enyoeePar', 'vue'],
            where: [{ id: _id }],
        });
    }
    async createMessage(message: Message) {
        this.messagesRepository.save(message);
    }
    async updateMessage(message: Message) {
        this.messagesRepository.save(message);
    }

    async deleteMessage(message: Message) {
        this.messagesRepository.delete(message);
    }
}
