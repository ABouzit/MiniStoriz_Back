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
       return await this.service.getHistoires().then((histoires) => {
           return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/nbrvue')
    async getAllNbrVue(@Res() res) {
        return await this.service.getHistoiresByNbrVue().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/populaire')
    async getAllPopulaire(@Res() res) {
        return await this.service.getHistoiresByPopulaire().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/plusrecent')
    async getAllPlusRecent(@Res() res) {
        return await this.service.getHistoiresPlusRecent().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/plusancient')
    async getAllPlusAncien(@Res() res) {
        return  await this.service.getHistoiresPlusAncien().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/nbrvues')
    async getAllNbrVues(@Res() res) {
        return await this.service.getHistoiresByNbrVues().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/populaires')
    async getAllPopulaires(@Res() res) {
        return  await this.service.getHistoiresByPopulaires().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/plusrecents')
    async getAllPlusRecents(@Res() res) {
        return await this.service.getHistoiresPlusRecents().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        })
    }
    @Get('/plusancients')
    async getAllPlusAnciens(@Res() res) {
        return  await this.service.getHistoiresPlusAnciens().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/take/:number')
    async getNumber(@Res() res, @Param() params) {
        return await this.service.getNumberOfHistoires(params.number).then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });

    }
    @Post()
    async create(@Body() histoire: Histoire, @Res() res) {
        return await this.service.createHistoire(histoire).then((newHistoire) => {
            return res.status(HttpStatus.OK).json({
                message: 'L\'histoire a ete cree avec succes!',
                id: newHistoire.id,
            });
        });
    }
    @Put()
    async update(@Body() histoire: Histoire, @Res() res) {
        return  await this.service.updateHistoire(histoire).then((result) => {
             return res.status(HttpStatus.OK).json({
                 message: 'L\'histoire a ete mis a jour avec succes!',
                 post: result,
             }); },
        );
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
