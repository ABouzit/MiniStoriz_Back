import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';

import { Bloquer } from './bloquer.entity';
import { BloquersService } from './bloquers.service';

@Controller('bloquer')
export class BloquersController {
    constructor(private service: BloquersService) { }

    @Get(':id')
     get(@Res() res, @Param() params) {
        return this.service.getBloquer(params.id).then(relation=>{
            return res.status(HttpStatus.OK).json(relation);
        });    
    }
    @Get()
    async getAll(@Res() res) {
        const bloquers = await this.service.getBloquers();
        return res.status(HttpStatus.OK).json(bloquers);
    }
    @Post()
    create(@Body() bloquer: Bloquer, @Res() res) {
        return this.service.createBloquer(bloquer).then(ress=>{
            return res.status(HttpStatus.OK).json(ress);
        })
    }

    @Put()
    update(@Body() bloquer: Bloquer, @Res() res) {
        return this.service.updateBloquer(bloquer).then(ress=>{
            return res.status(HttpStatus.OK).json(ress);
        })
    }

    @Delete(':id')
    deleteBloquer(@Param() params, @Res() res) {
        return this.service.deleteBloquer(params.id).then(ress=>{
            return res.status(HttpStatus.OK).json(ress);
        })
    }
    @Delete('/between/:id1/:id2')
     deleteBloquers(@Param() params, @Res() res) {
        return this.service.deleteBloquerById(params.id1,params.id2).then(ress=>{
            console.log('hna');
            return res.status(HttpStatus.OK).json(ress);

        })
    }
    @Get('/getBloquerId/:id/:id2')
    getRelationId(@Res() res, @Param() params) {
        return this.service.getBloquerId(params.id, params.id2).then(relation => {
            return res.status(HttpStatus.OK).json(relation);
        });
    }
}
