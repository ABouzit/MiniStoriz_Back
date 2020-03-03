import { Controller, Get, Res, Param, NotFoundException, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { ImpressionsService } from './impressions.service';
import { Impression } from './impression.entity';

@Controller('impressions')
export class ImpressionsController {
  constructor(private service: ImpressionsService) {}

  @Get(':id')
  async get(@Res() res, @Param() params) {
    const impression = await this.service.getImpression(params.id);
    if (impression.length === 0) {
      throw new NotFoundException("L'impression n'existe pas!");
    }
    return res.status(HttpStatus.OK).json(impression);
  }
  @Get()
  async getAll(@Res() res) {
    const impressions = await this.service.getImpressions();
    return res.status(HttpStatus.OK).json(impressions);
  }
  @Get('/histoire/:id')
  async getAllImpHistoire(@Res() res, @Param() params) {
    const impressions = await this.service.getImpressionsHistoire(params.id);
    return res.status(HttpStatus.OK).json(impressions);
  }
  @Post()
  create(@Body() impression: Impression, @Res() res) {
    return this.service.createImpression(impression).then(newImpression => {
      return res.status(HttpStatus.OK).json({
        message: "L'impression a ete cree avec succes!",
        post: newImpression,
      });
    });
  }

  @Put()
  async update(@Body() user: Impression, @Res() res) {
    const updatedImpression = await this.service.updateImpression(user);
    return res.status(HttpStatus.OK).json({
      message: "L'impression a ete mis a jour avec succes!",
      post: updatedImpression,
    });
  }

  @Delete(':id')
  async deleteUser(@Param() params, @Res() res) {
    const deletedImpression = await this.service.deleteImpression(params.id);
    return res.status(HttpStatus.OK).json({
      message: "L'impression a ete supprimer avec succes!",
      post: deletedImpression,
    });
  }
}
