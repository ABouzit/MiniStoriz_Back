import { Module } from '@nestjs/common';
import { ImpressionsService } from './impressions.service';
import { ImpressionsController } from './impressions.controller';
import { Impression } from './impression.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoiresService } from 'src/histoires/histoires.service';
import { HistoiresModule } from 'src/histoires/histoires.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { FirebaseService } from 'src/users/firebase/firebase.service';
import { UserInfo } from 'src/users/firebase/userInfo.class';

@Module({
  // tslint:disable-next-line: whitespace
  imports: [TypeOrmModule.forFeature([Impression]),HistoiresModule,UsersModule],
  providers: [ImpressionsService, HistoiresService, UsersService,FirebaseService, UserInfo],
  controllers: [ImpressionsController],
  exports: [TypeOrmModule],
})
export class ImpressionsModule {}
