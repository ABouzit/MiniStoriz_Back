import { Controller, Get, Param, Post, Body, Put, Delete, Res, NotFoundException, HttpStatus, Req } from '@nestjs/common';
import { HistoiresService } from './histoires.service';
import { Histoire } from './histoire.entity';

@Controller('histoires')
export class HistoiresController {
  constructor(private service: HistoiresService) {}
  @Get('/byId/:id')
  get(@Res() res, @Param() params) {
    return this.service.getHistoire(params.id).then(histoire => {
      if (histoire.length === 0) {
        throw new NotFoundException("L'histoire n'existe pas!");
      }
      return res.status(HttpStatus.OK).json(histoire);
    });
  }
  @Get()
  getAll(@Res() res) {
    return this.service.getHistoires().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/:etat')
  getAllEnAttante(@Res() res, @Param() params) {
    return this.service.getHistoiresWithStat(params.etat).then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('count/:etat')
  CountAllEnAttante(@Res() res, @Param() params) {
    return this.service.countHistoiresWithStat(params.etat).then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  } @Get('admin/count')
  Count(@Res() res, @Param() params) {
    return this.service.countHistoires().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/demandeSuppression/:etat')
  getAllwithDemandeSuppression(@Res() res, @Param() params) {
    return this.service
      .getHistoiresWithDemandeSuppression(Boolean(params.etat))
      .then(histoires => {
        return res.status(HttpStatus.OK).json(histoires);
      });
  }
  @Get('/demandeSuppressionCount/:etat')
  countAllwithDemandeSuppression(@Res() res, @Param() params) {
    return this.service
      .countHistoiresWithDemandeSuppression(Boolean(params.etat))
      .then(histoires => {
        return res.status(HttpStatus.OK).json(histoires);
      });
  }
  @Get('/nbrvue')
  getAllNbrVue(@Res() res) {
    return this.service.getHistoiresByNbrVue().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/populaire')
  getAllPopulaire(@Res() res) {
    return this.service.getHistoiresByPopulaire().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/plusrecent')
  getAllPlusRecent(@Res() res) {
    return this.service.getHistoiresPlusRecent().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/plusancient')
  getAllPlusAncien(@Res() res) {
    return this.service.getHistoiresPlusAncien().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/nbrvues')
  getAllNbrVues(@Res() res) {
    return this.service.getHistoiresByNbrVues().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/populaires')
  getAllPopulaires(@Res() res) {
    return this.service.getHistoiresByPopulaires().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/plusrecents')
  getAllPlusRecents(@Res() res) {
    return this.service.getHistoiresPlusRecents().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/plusancients')
  getAllPlusAnciens(@Res() res) {
    return this.service.getHistoiresPlusAnciens().then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }
  @Get('/take/:number/:skip/:filtre/:search')
  getNumber(@Res() res, @Param() params) {
    return this.service
      .getNumberOfHistoires(
        params.number,
        params.skip,
        params.filtre,
        params.search,
      )
      .then(histoires => {
        return res.status(HttpStatus.OK).json(histoires);
      });
  }
  @Get('/illustrer/take/:number/:skip/:filtre/:search')
  getNumberHistoire(@Res() res, @Param() params) {
    return this.service
      .getNumberOfHistoiresText(
        params.number,
        params.skip,
        params.filtre,
        params.search,
      )
      .then(histoires => {
        return res.status(HttpStatus.OK).json(histoires);
      });
  }
  @Get('/takeByUser/:number/:skip/:filtre/:search/:id')
  getNumberByUser(@Res() res, @Param() params) {
    return this.service
      .getNumberOfHistoiresSearchByUser(
        params.number,
        params.skip,
        params.filtre,
        params.search,
        params.id,
      )
      .then(histoires => {
        return res.status(HttpStatus.OK).json(histoires);
      });
  }
  @Get('/takeByMe/:number/:skip/:filtre/:search/:id')
  getNumberByMe(@Res() res, @Param() params) {
    return this.service
      .getNumberOfHistoiresSearchByMe(
        params.number,
        params.skip,
        params.filtre,
        params.search,
        params.id,
      )
      .then(histoires => {
        return res.status(HttpStatus.OK).json(histoires);
      });
  }
  @Get('/admin/getStorizByUser/:id')
  getStorizByUser(@Res() res, @Param() params) {
    return this.service.getUserHistoires(params.id).then(histoires => {
      return res.status(HttpStatus.OK).json(histoires);
    });
  }

  @Get('/takeUsers/:number/:skip/:filtre/:search')
  getNumberUsers(@Res() res, @Param() params) {
    return this.service
      .getNumberOfHistoiresUsers(
        params.number,
        params.skip,
        params.filtre,
        params.search,
      )
      .then(histoires => {
        return res.status(HttpStatus.OK).json(histoires);
      });
  }
  @Get('/numberHistoires')
  getNumberHistoires(@Res() res) {
    return this.service.numberHistoire().then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/illustrer/numberHistoires')
  getNumberHistoiresIllustrer(@Res() res) {
    return this.service.numberHistoireIllistrer().then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/numberHistoiresById/:id')
  getNumberHistoiresById(@Res() res, @Param() params) {
    return this.service.numberHistoireByUser(params.id).then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/numberHistoiresByMe/:id')
  numberHistoireByMe(@Res() res, @Param() params) {
    return this.service.numberHistoireByMe(params.id).then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/rateDessinByUser/:id')
  getrateDessinByUser(@Res() res, @Param() params) {
    return this.service.rateDessinByUser(params.id).then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/rateTextByUser/:id')
  getrateTextByUser(@Res() res, @Param() params) {
    return this.service.rateTextByUser(params.id).then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/numberHistoiresSearch/:search')
  getNumberHistoiresSearch(@Res() res, @Param() params) {
    return this.service.numberHistoireSearch(params.search).then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/illustrer/numberHistoiresSearch/:search')
  getNumberHistoiresSearchIllustrer(@Res() res, @Param() params) {
    return this.service.numberHistoireSearch(params.search).then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/numberHistoiresSearchById/:search/:id')
  getNumberHistoiresSearchById(@Res() res, @Param() params) {
    return this.service
      .numberHistoireSearchByUser(params.search, params.id)
      .then(number => {
        return res.status(HttpStatus.OK).json(number);
      });
  }
  @Get('/numberHistoiresSearchByMe/:search/:id')
  getNumberHistoiresSearchByMe(@Res() res, @Param() params) {
    return this.service
      .numberHistoireSearchByMe(params.search, params.id)
      .then(number => {
        return res.status(HttpStatus.OK).json(number);
      });
  }
  @Get('/numberHistoiresSearchUsers/:search')
  getNumberHistoiresSearchUsers(@Res() res, @Param() params) {
    return this.service
      .numberHistoireSearchUsers(params.search)
      .then(number => {
        return res.status(HttpStatus.OK).json(number);
      });
  }
  @Get('/numberHistoiresTextUsers/:id')
  getNumberHistoiresTextUsers(@Res() res, @Param() params) {
    return this.service.numberHistoireTextUsers(params.id).then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/numberHistoiresDessinUsers/:id')
  getNumberHistoiresDessinUsers(@Res() res, @Param() params) {
    return this.service.numberHistoireDessinUsers(params.id).then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Post(':id')
  create(@Body() histoire: Histoire, @Res() res, @Param() params) {
    return this.service
      .createHistoire(histoire, params.id)
      .then(newHistoire => {
        return res.status(HttpStatus.OK).json({
          message: "L'histoire a ete cree avec succes!",
          id: newHistoire.id,
        });
      });
  }
  @Put()
  update(@Body() histoire: Histoire, @Res() res) {
    return this.service.updateHistoire(histoire).then(result => {
      return res.status(HttpStatus.OK).json({
        message: "L'histoire a ete mis a jour avec succes!",
        id: result.id,
      });
    });
  }
  @Put("admin/:idDessin/:idText")
  updateWithNotif(@Body() histoire: Histoire, @Res() res, @Req() req, @Param() params) {
    let url=req.protocol + '://' + req.get('host');
    return this.service.updateHistoireWithNotif(histoire, params.idDessin, params.idText, url).then(result => {
      return res.status(HttpStatus.OK).json({
        message: "L'histoire a ete mis a jour avec succes!",
        id: result.id,
      });
    });
  }
  @Delete(':id')
  deleteUser(@Param() params, @Res() res) {
    return this.service.deleteHistoire(params.id).then(histoire => {
      return res.status(HttpStatus.OK).json(histoire);
    });
  }
}
