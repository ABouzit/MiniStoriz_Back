import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';

import { Relation } from './relation.entity';
import { RelationsService } from './relations.service';

@Controller('relations')
export class RelationsController {
    constructor(private service: RelationsService) { }

    @Get(':id')
    async get(@Res() res, @Param() params) {
        const relation = await this.service.getRelation(params.id);
        if (relation.length === 0) {
            throw new NotFoundException('La relation n\'existe pas!');
        }
        return res.status(HttpStatus.OK).json(relation);
    }
    @Get()
    async getAll(@Res() res) {
        const relations = await this.service.getRelations();
        return res.status(HttpStatus.OK).json(relations);
    }
    @Post()
    async create(@Body() relation: Relation, @Res() res) {
        const newRelation = await this.service.createRelation(relation);
        return res.status(HttpStatus.OK).json({
            message: 'La relation a ete cree avec succes!',
            post: newRelation,
        });
    }

    @Put()
    async update(@Body() relation: Relation, @Res() res) {
        const updatedRelation = await this.service.updateRelation(relation);
        return res.status(HttpStatus.OK).json({
            message: 'La relation a ete mis a jour avec succes!',
            post: updatedRelation,
        });
    }

    @Delete(':id')
    async deleteUser(@Param() params, @Res() res) {
        const deletedRelation = await this.service.deleteRelation(params.id);
        return res.status(HttpStatus.OK).json({
            message: 'L\'utilisateur a ete supprimer avec succes!',
            post: deletedRelation,
        });
    }
}
