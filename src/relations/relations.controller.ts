import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus } from '@nestjs/common';

import { Relation } from './relation.entity';
import { RelationsService } from './relations.service';

@Controller('relations')
export class RelationsController {
  constructor(private service: RelationsService) {}

  @Get(':id')
  get(@Res() res, @Param() params) {
    return this.service.getRelation(params.id).then(relation => {
      return res.status(HttpStatus.OK).json(relation);
    });
  }
  @Get('/request/:id')
  getRelationRequest(@Res() res, @Param() params) {
    return this.service.getRelationRequest(params.id).then(relations => {
      return Promise.all(
        relations.map((relation, index) => {
          if (relation.read == false && relation.userTwo.id == params.id) {
            relation.read = true;
            return this.service.updateRelation(relation);
          }
        }),
      ).then(() => {
        return this.service.getRelationRequest(params.id).then(relations => {
          return res.status(HttpStatus.OK).json(relations);
        });
      });
    });
  }
  @Get('/getNumberRequest/:id')
  getRelationRequestNbr(@Res() res, @Param() params) {
    return this.service.getRelationRequestNbr(params.id).then(relations => {
      return res.status(HttpStatus.OK).json(relations);
    });
  }
  @Get('/getRelationType/:id/:id2')
  getRelationType(@Res() res, @Param() params) {
    return this.service.getRelationType(params.id, params.id2).then(relation => {
      console.log("hadi "+relation )
      return res.status(HttpStatus.OK).json(relation);
    });
  }
  @Get('/getRelationId/:id/:id2')
  getRelationId(@Res() res, @Param() params) {
    return this.service.getRelationId(params.id, params.id2).then(relation => {
      return res.status(HttpStatus.OK).json(relation);
    });
  }
  @Get('/getRelationIdAccepte/:id/:id2')
  getRelationIdAccepte(@Res() res, @Param() params) {
    return this.service
      .getRelationIdAccepte(params.id, params.id2)
      .then(relation => {
        return res.status(HttpStatus.OK).json(relation);
      });
  }
  @Get('admin/relationOfUser/:id')
  getRelationOfUser(@Res() res, @Param() params) {
    return this.service
      .getRelationOfUser(params.id)
      .then(relation => {
        return res.status(HttpStatus.OK).json(relation);
      });
  }
  @Get()
  async getAll(@Res() res) {
    const relations = await this.service.getRelations();
    return res.status(HttpStatus.OK).json(relations);
  }
  @Post()
  create(@Body() relation: Relation, @Res() res) {
    return this.service.createRelation(relation).then(ress => {
      return res.status(HttpStatus.OK).json(ress);
    });
  }

  @Put()
  update(@Body() relation: Relation, @Res() res) {
    return this.service.updateRelation(relation).then(ress => {
      return res.status(HttpStatus.OK).json(ress);
    });
  }

  @Delete(':id')
  deleteUser(@Param() params, @Res() res) {
    return this.service.deleteRelation(params.id).then(ress => {
      return res.status(HttpStatus.OK).json(ress);
    });
  }
  @Delete('/between/:id1/:id2')
  deleteRelations(@Param() params, @Res() res) {
    return this.service
      .deleteRelationById(params.id1, params.id2)
      .then(ress => {
        return res.status(HttpStatus.OK).json(ress);
      });
  }
}
