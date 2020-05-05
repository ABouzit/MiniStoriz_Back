import { Module } from '@nestjs/common';
import { Histoire } from './histoire.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoiresService } from './histoires.service';
import { HistoiresController } from './histoires.controller';
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
    imports: [TypeOrmModule.forFeature([Histoire]),UsersModule,MessagesModule,RelationsModule,NotificationModule,PlanchesModule],
    providers: [HistoiresService, UsersService, FirebaseService, UserInfo,MessagesService,RelationsService,NotificationService,PlanchesService],
    controllers: [HistoiresController],
    exports: [TypeOrmModule],
})
export class HistoiresModule {}
