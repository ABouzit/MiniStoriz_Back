import { Module } from '@nestjs/common';
import { ImpressionsService } from './impressions.service';
import { ImpressionsController } from './impressions.controller';
import { Impression } from './impression.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoiresService } from 'src/histoires/histoires.service';
import { HistoiresModule } from 'src/histoires/histoires.module';

@Module({
  // tslint:disable-next-line: whitespace
  imports: [TypeOrmModule.forFeature([Impression]),HistoiresModule],
  providers: [ImpressionsService, HistoiresService],
  controllers: [ImpressionsController],
  exports: [TypeOrmModule],
})
export class ImpressionsModule {}
