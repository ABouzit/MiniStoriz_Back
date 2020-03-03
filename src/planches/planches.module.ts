import { Module } from '@nestjs/common';
import { PlanchesService } from './planches.service';
import { PlanchesController } from './planches.controller';
import { Planche } from './planche.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Planche])],
  providers: [PlanchesService],
  controllers: [PlanchesController],
  exports: [TypeOrmModule],
})
export class PlanchesModule {}
