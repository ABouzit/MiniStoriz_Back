import { Controller, Get, Req, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
@Controller('images')
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get(':folder/:imgpath')
  seeUploadedFile(@Param('imgpath') image,@Param('folder') folder, @Res() res) {
    return res.sendFile(image, { root: './images/' + folder });
  }
}
