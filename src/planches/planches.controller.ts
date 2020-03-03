import { Controller, Get, Res, Param, NotFoundException, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { PlanchesService } from './planches.service';
import { Planche } from './planche.entity';
import { User } from 'src/users/user.entity';

@Controller('planches')
export class PlanchesController {
    constructor(private service: PlanchesService) { }

    @Get(':id')
    async get(@Res() res, @Param() params) {
        const planche = await this.service.getPlanche(params.id);
        if (planche.length === 0) {
            throw new NotFoundException('La planche n\'existe pas!');
        }
        return res.status(HttpStatus.OK).json(planche);
    }
    @Get('histoire/:id')
    async getByHistoire(@Res() res, @Param() params) {
        return await this.service.getPlancheByHistoire(params.id).then((planche) => 
        res.status(HttpStatus.OK).json(planche));
    }
    @Get()
    async getAll(@Res() res) {
        const planches = await this.service.getPlanches();
        return res.status(HttpStatus.OK).json(planches);
    }
    @Post()
<<<<<<< HEAD
    create(@Body() planche: Planche, @Res() res) {
        return this.service.createPlanche(planche).then((newPlanche) => {
=======
    async create(@Body() planche: Planche, @Res() res) {
        return await this.service.createPlanche(planche).get((newPlanche)=>{
>>>>>>> parent of 34b8f00... delete all
            return res.status(HttpStatus.OK).json({
                message: 'La planche a ete cree avec succes!',
                post: newPlanche,
            });
        });
    }

    @Put()
    async update(@Body() planche: Planche, @Res() res) {
        const updatedPlanche = await this.service.updatePlanche(planche);
        return res.status(HttpStatus.OK).json({
            message: 'La planche a ete mis a jour avec succes!',
            post: updatedPlanche,
        });
    }

    @Delete(':id')
    async deleteUser(@Param() params, @Res() res) {
        const deletedPlanche = await this.service.deletePlanche(params.id);
        return res.status(HttpStatus.OK).json({
            message: 'La planche a ete supprimer avec succes!',
            post: deletedPlanche,
        });
    }
}
