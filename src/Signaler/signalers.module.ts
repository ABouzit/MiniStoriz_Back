import { Module, forwardRef } from '@nestjs/common';
import { Signaler } from './signaler.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignalersController } from './signalers.controller';
import { SignalersService } from './signalers.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { FirebaseService } from 'src/users/firebase/firebase.service';
import { MessagesService } from 'src/messages/messages.service';
import { UserInfo } from 'src/users/firebase/userInfo.class';
import { MessagesModule } from 'src/messages/messages.module';
import { RelationsService } from 'src/relations/relations.service';
import { RelationsModule } from 'src/relations/relations.module';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    imports: [TypeOrmModule.forFeature([Signaler]),MessagesModule,UsersModule,RelationsModule,NotificationModule],
    providers: [SignalersService, FirebaseService, MessagesService, UserInfo, UsersService, RelationsService, NotificationService],
    controllers: [SignalersController],
    exports: [TypeOrmModule],
})
export class SignalersModule {}
