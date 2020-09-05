import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';

@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) { }

    @Get('/between/:id1/:id2/:take/:skip')
    getMessage(@Res() res,@Param() params) {
        return this.service.getMessage(params.id1,params.id2,params.skip,params.take).then(messages=>{
            return Promise.all(messages.map((message,index)=>{
                if (message.vue == false && message.userTwo.id == params.id1) {
                   message.vue = true
                   return this.service.updateMessage(message); 
                }
              })).then(()=>{
                return this.service.getMessage(params.id1,params.id2,params.skip,params.take).then(messages=>{
                    return res.status(HttpStatus.OK).json(messages);
                }); 
              })
            })
    }
    @Get('/nbrMessage/:id1/:id2')
    getNbrMessage(@Res() res,@Param() params) {
        return this.service.getNbrMessage(params.id1,params.id2).then(messages=>{
                    return res.status(HttpStatus.OK).json(messages);
            })
    }
    @Get('/delete/between/:id1/:id2')
    getdelete(@Res() res,@Param() params) {
        return this.service.deleteAllMessage(params.id1,params.id2).then(messages=>{
                    return res.status(HttpStatus.OK).json(messages);
            })
    }
    @Get('/users/:id1')
    getUserMessage(@Res() res,@Param() params) {
        return this.service.getUserMessage(params.id1).then(messages=>{
            return res.status(HttpStatus.OK).json(messages);
        });
    }
    @Get('/numberVueTotal/:id1')
    getNumberVueTotal(@Res() res,@Param() params) {
        return this.service.getNumberVueTotal(params.id1).then(messages=>{
            return res.status(HttpStatus.OK).json(messages);
        });
    }
    @Get()
    async getAll(@Res() res) {
        const messages = await this.service.getMessages();
        return res.status(HttpStatus.OK).json(messages);
    }
    @Post()
    create(@Body() message: Message, @Res() res) {
        return this.service.createMessage(message).then(messages=>{
            
            return res.status(HttpStatus.OK).json(messages);
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
