import { Controller, Get, Res, Param, NotFoundException, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { ImpressionsService } from './impressions.service';
import { Impression } from './impression.entity';
import { Histoire } from 'src/histoires/histoire.entity';

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
  @Get("admin/count")
  async countAll(@Res() res) {
    const impressions = await this.service.countImpressions();
    return res.status(HttpStatus.OK).json(impressions);
  }
  @Get("admin/countToday")
  async countAllToday(@Res() res) {
    const impressions = await this.service.countImpressionsToday();
    return res.status(HttpStatus.OK).json(impressions);
  }
  @Get('/histoire/:id')
  getAllImpHistoire(@Res() res, @Param() params) {
    return this.service
      .getImpressionsHistoire(params.id)
      .then(impressions => res.status(HttpStatus.OK).json(impressions));
  }
  @Get('admin/user/:id')
  getImpressionsUser(@Res() res, @Param() params) {
    return this.service
      .getImpressionsUser(params.id)
      .then(impressions => res.status(HttpStatus.OK).json(impressions));
  }
  @Get('histoire/:id/take/:number/:skip')
  getAllImpHistoireByNumberAndSkip(@Res() res, @Param() params) {
    return this.service
      .getImpressionsHistoirebyNumberAndSkip(
        params.number,
        params.skip,
        params.id,
      )
      .then(impressions => res.status(HttpStatus.OK).json(impressions));
  }
  @Get('histoire/:id/take/:number')
  getAllImpHistoireByNumber(@Res() res, @Param() params) {
    return this.service
      .getImpressionsHistoireByNumber(params.number, params.id)
      .then(impressions => res.status(HttpStatus.OK).json(impressions));
  }
  @Get('permition/:id/:id2')
  getPermitionImp(@Res() res, @Param() params) {
    return this.service
      .getPermitionImp(params.id, params.id2)
      .then(impressions => res.status(HttpStatus.OK).json(impressions));
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
  @Delete('/admin/:id')
  async deleteUserWithRatings(@Param() params, @Res() res) {
    const deletedImpression = await this.service.deleteImpressionWithRatings(
      params.id,
    );
    return res.status(HttpStatus.OK).json({
      message: "L'impression a ete supprimer avec succes!",
      post: deletedImpression,
    });
  }
  @Delete('/histoire/:id')
  deleteHistoire(@Param() params, @Res() res) {
    
    return this.service.deleteHistoire(params.id).then(imp => {
      return res.status(HttpStatus.OK).json(imp);
    });
  }
}
