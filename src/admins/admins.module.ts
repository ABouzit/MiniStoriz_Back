import { Module, forwardRef } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { FirebaseService } from './firebase/firebase.service';
import {AdminInfo } from './firebase/adminInfo.class';
import { MessagesService } from 'src/messages/messages.service';
import { MessagesModule } from 'src/messages/messages.module';
import { RelationsService } from 'src/relations/relations.service';
import { RelationsModule } from 'src/relations/relations.module';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';
import { Notification } from 'src/notification/notification.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Admin]),NotificationModule, MessagesModule,RelationsModule],
  providers: [AdminsService, FirebaseService, AdminInfo,MessagesService,RelationsService,NotificationService],
  controllers: [AdminsController],
  exports: [TypeOrmModule],
})
export class AdminsModule {}
