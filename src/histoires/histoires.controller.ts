import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { HistoiresService } from './histoires.service';
import { Histoire } from './histoire.entity';

@Controller('histoires')
export class HistoiresController {
    constructor(private service: HistoiresService) { }
    @Get('/byId/:id')
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
    @Get('/nbrvue')
    async getAllNbrVue(@Res() res) {
        const histoires = await this.service.getHistoiresByNbrVue();
        return res.status(HttpStatus.OK).json(histoires);
    }
    @Get('/populaire')
    async getAllPopulaire(@Res() res) {
        const histoires = await this.service.getHistoiresByPopulaire();
        return res.status(HttpStatus.OK).json(histoires);
    }
    @Get('/plusrecent')
    async getAllPlusRecent(@Res() res) {
        const histoires = await this.service.getHistoiresPlusRecent();
        return res.status(HttpStatus.OK).json(histoires);
    }
    @Get('/plusancient')
    async getAllPlusAncien(@Res() res) {
        const histoires = await this.service.getHistoiresPlusAncien();
        return res.status(HttpStatus.OK).json(histoires);
    }
    @Get('/take/:number')
    async getNumber(@Res() res, @Param() params) {
        const histoires = await this.service.getNumberOfHistoires(params.number);
        return res.status(HttpStatus.OK).json(histoires);
    }
    @Post()
    async create(@Body() histoire: Histoire, @Res() res) {
        
        const newHistoire = await this.service.createHistoire(histoire);
        return res.status(HttpStatus.OK).json({
            message: 'L\'histoire a ete cree avec succes!',
            id: newHistoire.id,
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
