import { Controller, Get, Req, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  findOne(@Param('id') id): string {
    return `This action returns a ${id} cat`;
  }
}
