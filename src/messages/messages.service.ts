import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
        private readonly mailerService: MailerService
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

    sendEmail(name: string,objet:string,email:string,message:string){
        this.mailerService.sendMail({
        to: email, // list of receivers
        from: 'no-reply@formaconnect.com', // sender address
        subject: objet, // Subject line
        html: '<b>Bonjour '+name+',</b><br><p>'+message+'</p>', // HTML body content
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
    }
}
