import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { HistoiresService } from './histoires.service';
import { Histoire } from './histoire.entity';

@Controller('histoires')
export class HistoiresController {
    constructor(private service: HistoiresService) { }
    @Get('/byId/:id')
    get(@Res() res, @Param() params) {
        return this.service.getHistoire(params.id).then((histoire) => {
            if (histoire.length === 0) {
            throw new NotFoundException('L\'histoire n\'existe pas!');
             }
            return res.status(HttpStatus.OK).json(histoire);
         });
    }
    @Get()
    getAll(@Res() res) {
       return this.service.getHistoires().then((histoires) => {
           return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/nbrvue')
    getAllNbrVue(@Res() res) {
        return this.service.getHistoiresByNbrVue().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/populaire')
    getAllPopulaire(@Res() res) {
        return this.service.getHistoiresByPopulaire().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/plusrecent')
    getAllPlusRecent(@Res() res) {
        return this.service.getHistoiresPlusRecent().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/plusancient')
    getAllPlusAncien(@Res() res) {
        return  this.service.getHistoiresPlusAncien().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/nbrvues')
    getAllNbrVues(@Res() res) {
        return this.service.getHistoiresByNbrVues().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/populaires')
    getAllPopulaires(@Res() res) {
        return  this.service.getHistoiresByPopulaires().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/plusrecents')
    getAllPlusRecents(@Res() res) {
        return this.service.getHistoiresPlusRecents().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        })
    }
    @Get('/plusancients')
    getAllPlusAnciens(@Res() res) {
        return  this.service.getHistoiresPlusAnciens().then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/take/:number/:skip/:filtre/:search')
    getNumber(@Res() res, @Param() params) {
        return this.service.getNumberOfHistoires(params.number,params.skip,params.filtre,params.search).then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/takeByUser/:number/:skip/:filtre/:search/:id')
    getNumberByUser(@Res() res, @Param() params) {
        return this.service.getNumberOfHistoiresSearchByUser(params.number,params.skip,params.filtre,params.search,params.id).then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/takeUsers/:number/:skip/:filtre/:search')
    getNumberUsers(@Res() res, @Param() params) {
        return this.service.getNumberOfHistoiresUsers(params.number,params.skip,params.filtre,params.search).then((histoires) => {
            return res.status(HttpStatus.OK).json(histoires);
        });
    }
    @Get('/numberHistoires')
    getNumberHistoires(@Res() res) {
        return  this.service.numberHistoire().then((number) => {
            return res.status(HttpStatus.OK).json(number);
        });
    }
    @Get('/numberHistoiresById/:id')
    getNumberHistoiresById(@Res() res, @Param() params) {
        return  this.service.numberHistoireByUser(params.id).then((number) => {
            return res.status(HttpStatus.OK).json(number);
        });
    }
    @Get('/rateDessinByUser/:id')
    getrateDessinByUser(@Res() res, @Param() params) {
        return  this.service.rateDessinByUser(params.id).then((number) => {
            return res.status(HttpStatus.OK).json(number);
        });
    }
    @Get('/rateTextByUser/:id')
    getrateTextByUser(@Res() res, @Param() params) {
        return  this.service.rateTextByUser(params.id).then((number) => {
            return res.status(HttpStatus.OK).json(number);
        });
    }
    @Get('/numberHistoiresSearch/:search')
    getNumberHistoiresSearch(@Res() res, @Param() params) {
        return  this.service.numberHistoireSearch(params.search).then((number) => {
            return res.status(HttpStatus.OK).json(number);
        });
    }
    @Get('/numberHistoiresSearchById/:search/:id')
    getNumberHistoiresSearchById(@Res() res, @Param() params) {
        return  this.service.numberHistoireSearchByUser(params.search, params.id).then((number) => {
            return res.status(HttpStatus.OK).json(number);
        });
    }
    @Get('/numberHistoiresSearchUsers/:search')
    getNumberHistoiresSearchUsers(@Res() res, @Param() params) {
        return  this.service.numberHistoireSearchUsers(params.search).then((number) => {
            return res.status(HttpStatus.OK).json(number);
        });
    }
    @Get('/numberHistoiresTextUsers/:id')
    getNumberHistoiresTextUsers(@Res() res, @Param() params) {
        return  this.service.numberHistoireTextUsers(params.id).then((number) => {
            return res.status(HttpStatus.OK).json(number);
        });
    }
    @Get('/numberHistoiresDessinUsers/:id')
    getNumberHistoiresDessinUsers(@Res() res, @Param() params) {
        return  this.service.numberHistoireDessinUsers(params.id).then((number) => {
            return res.status(HttpStatus.OK).json(number);
        });
    }
    @Post()
    create(@Body() histoire: Histoire, @Res() res) {
        return this.service.createHistoire(histoire).then((newHistoire) => {
            return res.status(HttpStatus.OK).json({
                message: 'L\'histoire a ete cree avec succes!',
                id: newHistoire.id,
            });
        });
    }
    @Put()
    update(@Body() histoire: Histoire, @Res() res) {
        return  this.service.updateHistoire(histoire).then((result) => {
             return res.status(HttpStatus.OK).json({
                 message: 'L\'histoire a ete mis a jour avec succes!',
                 post: result,
             }); },
        );
    }
    @Delete(':id')
     deleteUser(@Param() params, @Res() res) {
        const deletedHistoire = this.service.deleteHistoire(params.id);
        return res.status(HttpStatus.OK).json({
            message: 'L\'histoire a ete supprimer avec succes!',
            post: deletedHistoire,
        });
    }
}
