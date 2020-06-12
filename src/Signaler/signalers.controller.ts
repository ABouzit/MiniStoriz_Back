import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';

import { Signaler } from './signaler.entity';
import { SignalersService } from './signalers.service';

@Controller('signaler')
export class SignalersController {
    constructor(private service: SignalersService) { }

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
    @Post()
    create(@Body() bloquer: Signaler, @Res() res) {
        return this.service.createSignaler(bloquer).then(ress=>{
            return res.status(HttpStatus.OK).json(ress);
        })
    }

    @Put()
    update(@Body() bloquer: Signaler, @Res() res) {
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
    @Delete('/between/:id1/:id2')
     deleteSignalers(@Param() params, @Res() res) {
        return this.service.deleteSignalerById(params.id1,params.id2).then(ress=>{
            console.log('hna');
            return res.status(HttpStatus.OK).json(ress);

        })
    }
    @Get('/between/:id/:id2')
    getSignalerId(@Res() res, @Param() params) {
        return this.service.getSignalerId(params.id, params.id2).then(relation => {
            return res.status(HttpStatus.OK).json(relation);
        });
    }
}
