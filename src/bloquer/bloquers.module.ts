import { Module, forwardRef } from '@nestjs/common';
import { Bloquer } from './bloquer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloquersController } from './bloquers.controller';
import { BloquersService } from './bloquers.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { FirebaseService } from 'src/users/firebase/firebase.service';
import { MessagesService } from 'src/messages/messages.service';
import { UserInfo } from 'src/users/firebase/userInfo.class';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
    imports: [TypeOrmModule.forFeature([Bloquer]),MessagesModule],
    providers: [BloquersService,FirebaseService,MessagesService,UserInfo],
    controllers: [BloquersController],
    exports: [TypeOrmModule],
})
export class BloquersModule {}
