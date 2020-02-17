import { Module } from '@nestjs/common';
import { ImpressionsService } from './impressions.service';
import { ImpressionsController } from './impressions.controller';
import { Impression } from './impression.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Impression])],
  providers: [ImpressionsService],
  controllers: [ImpressionsController],
  exports: [TypeOrmModule],
})
export class ImpressionsModule {}
