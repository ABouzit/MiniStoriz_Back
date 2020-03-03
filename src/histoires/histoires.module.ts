import { Module } from '@nestjs/common';
import { Histoire } from './histoire.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoiresService } from './histoires.service';
import { HistoiresController } from './histoires.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Histoire])],
    providers: [HistoiresService],
    controllers: [HistoiresController],
    exports: [TypeOrmModule],
})
export class HistoiresModule {}
