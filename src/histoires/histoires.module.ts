import { Module } from '@nestjs/common';
import { Histoire } from './histoire.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoiresService } from './histoires.service';
import { HistoiresController } from './histoires.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { FirebaseService } from 'src/users/firebase/firebase.service';
import { UserInfo } from 'src/users/firebase/userInfo.class';

@Module({
    imports: [TypeOrmModule.forFeature([Histoire]),UsersModule],
    providers: [HistoiresService, UsersService, FirebaseService, UserInfo],
    controllers: [HistoiresController],
    exports: [TypeOrmModule],
})
export class HistoiresModule {}
