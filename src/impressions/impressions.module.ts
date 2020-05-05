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
import { MessagesService } from 'src/messages/messages.service';
import { MessagesModule } from 'src/messages/messages.module';
import { RelationsService } from 'src/relations/relations.service';
import { RelationsModule } from 'src/relations/relations.module';
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationService } from 'src/notification/notification.service';
import { PlanchesModule } from 'src/planches/planches.module';
import { PlanchesService } from 'src/planches/planches.service';

@Module({
  // tslint:disable-next-line: whitespace
  imports: [TypeOrmModule.forFeature([Impression]),UsersModule,MessagesModule,RelationsModule,NotificationModule,PlanchesModule,HistoiresModule],
  providers: [ImpressionsService, UsersService,FirebaseService, UserInfo, MessagesService,RelationsService,NotificationService,PlanchesService,HistoiresService],
  controllers: [ImpressionsController],
  exports: [TypeOrmModule],
})
export class ImpressionsModule {}
