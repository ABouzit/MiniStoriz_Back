import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';

import { Contact } from './contact.entity';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
    constructor(private service: ContactsService) { }

    @Get(':id')
     get(@Res() res, @Param() params) {
        return this.service.getSignaler(params.id).then(relation=>{
            return res.status(HttpStatus.OK).json(relation);
        });
    }
    @Get() 
    async getAll(@Res() res) {
        const bloquers = await this.service.getSignalers();
        return res.status(HttpStatus.OK).json(bloquers);
    }
    @Get("admin/count") 
    async countAll(@Res() res) {
        const bloquers = await this.service.countSignalers();
        return res.status(HttpStatus.OK).json(bloquers);
    }
    @Post()
    create(@Body() bloquer: Contact, @Res() res) {
        return this.service.createSignaler(bloquer).then(ress=>{
            return res.status(HttpStatus.OK).json(ress);
        })
    }

    @Put()
    update(@Body() bloquer: Contact, @Res() res) {
        return this.service.updateSignaler(bloquer).then(ress=>{
            return res.status(HttpStatus.OK).json(ress);
        })
    }

    @Delete(':id')
    deleteSignaler(@Param() params, @Res() res) {
        return this.service.deleteSignaler(params.id).then(ress=>{
            return res.status(HttpStatus.OK).json(ress);
        })
    }

}
