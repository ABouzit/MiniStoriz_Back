import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';

@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) { }

    @Get(':id')
    async get(@Res() res,@Param() params) {
        const message = await this.service.getMessage(params.id);
        if (message.length === 0) {
            throw new NotFoundException('Le message n\'existe pas!');
        }
        return res.status(HttpStatus.OK).json(message);
    }
    @Get()
    async getAll(@Res() res) {
        const messages = await this.service.getMessages();
        return res.status(HttpStatus.OK).json(messages);
    }
    @Post()
    async create(@Body() message: Message, @Res() res) {
        const newMessage = await this.service.createMessage(message);
        return res.status(HttpStatus.OK).json({
            message: 'Le message a ete cree avec succes!',
            post: newMessage,
        });
    }

    @Post('contact')
    async createContact(@Body() contact: any, @Res() res) {
        const newMessage = await this.service.sendEmail(contact.nom,contact.objet,contact.email,contact.message);
        return res.status(HttpStatus.OK).json({
            message: 'L\'Email a ete cree avec succes!'
        });
    }

    @Put()
    async update(@Body() message: Message, @Res() res) {
        const updatedMessage = await this.service.updateMessage(message);
        return res.status(HttpStatus.OK).json({
            message: 'Le message a ete mis a jour avec succes!',
            post: updatedMessage,
        });
    }

    @Delete(':id')
    async deleteUser(@Param() params, @Res() res) {
        const deletedMessage = await this.service.deleteMessage(params.id);
        return res.status(HttpStatus.OK).json({
            message: 'Le message a ete supprimer avec succes!',
            post: deletedMessage,
        });
    }
}
