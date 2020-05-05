import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FirebaseService } from './firebase/firebase.service';
import { UserInfo } from './firebase/userInfo.class';
import { MessagesService } from 'src/messages/messages.service';
import { MessagesModule } from 'src/messages/messages.module';
import { RelationsService } from 'src/relations/relations.service';
import { RelationsModule } from 'src/relations/relations.module';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';
import { Notification } from 'src/notification/notification.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User]),NotificationModule, MessagesModule,RelationsModule],
  providers: [UsersService, FirebaseService, UserInfo,MessagesService,RelationsService,NotificationService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
