import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { HistoiresService } from './histoires.service';
import { Histoire } from './histoire.entity';

@Controller('histoires')
export class HistoiresController {
    constructor(private service: HistoiresService) { }
    @Get(':id')
    async get(@Res() res, @Param() params) {
        const histoire = await this.service.getHistoire(params.id);
        if (histoire.length === 0) {
            throw new NotFoundException('L\'histoire n\'existe pas!');
        }
        return res.status(HttpStatus.OK).json(histoire);
    }
    @Get()
    async getAll(@Res() res) {
        const histoires = await this.service.getHistoires();
        return res.status(HttpStatus.OK).json(histoires);
    }
    @Post()
    async create(@Body() histoire: Histoire, @Res() res) {
        const newHistoire = await this.service.createHistoire(histoire);
        return res.status(HttpStatus.OK).json({
            message: 'L\'histoire a ete cree avec succes!',
            post: newHistoire,
        });
    }
    @Put()
    async update(@Body() histoire: Histoire, @Res() res) {
        const updatedHistoire = await this.service.updateHistoire(histoire);
        return res.status(HttpStatus.OK).json({
            message: 'L\'histoire a ete mis a jour avec succes!',
            post: updatedHistoire,
        });
    }
    @Delete(':id')
    async deleteUser(@Param() params, @Res() res) {
        const deletedHistoire = await this.service.deleteHistoire(params.id);
        return res.status(HttpStatus.OK).json({
            message: 'L\'histoire a ete supprimer avec succes!',
            post: deletedHistoire,
        });
    }
}
