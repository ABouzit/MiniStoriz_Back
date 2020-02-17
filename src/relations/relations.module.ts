import { Module } from '@nestjs/common';
import { Relation } from './relation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationsController } from './relations.controller';
import { RelationsService } from './relations.service';

@Module({
    imports: [TypeOrmModule.forFeature([Relation])],
    providers: [RelationsService],
    controllers: [RelationsController],
    exports: [TypeOrmModule],
})
export class RelationsModule {}
