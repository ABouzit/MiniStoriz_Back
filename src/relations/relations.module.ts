import { Module, forwardRef } from '@nestjs/common';
import { Relation } from './relation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationsController } from './relations.controller';
import { RelationsService } from './relations.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { FirebaseService } from 'src/users/firebase/firebase.service';
import { MessagesService } from 'src/messages/messages.service';
import { UserInfo } from 'src/users/firebase/userInfo.class';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
    imports: [TypeOrmModule.forFeature([Relation]),MessagesModule],
    providers: [RelationsService,FirebaseService,MessagesService,UserInfo],
    controllers: [RelationsController],
    exports: [TypeOrmModule],
})
export class RelationsModule {}
