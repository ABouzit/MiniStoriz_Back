import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FirebaseService } from './firebase/firebase.service';
import { UserInfo } from './firebase/userInfo.class';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, FirebaseService, UserInfo],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
