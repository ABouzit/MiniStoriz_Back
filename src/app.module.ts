import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { RelationsModule } from './relations/relations.module';
import 'reflect-metadata';
import { Relation } from './relations/relation.entity';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/message.entity';
import { HistoiresModule } from './histoires/histoires.module';
import { ImpressionsModule } from './impressions/impressions.module';
import { PlanchesModule } from './planches/planches.module';
import { Histoire } from './histoires/histoire.entity';
import { Planche } from './planches/planche.entity';
import { Impression } from './impressions/impression.entity';
import { TelechargementController } from './telechargementDesFichiers/telechargement.Controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
       port: 3306,
      username: 'root',
      password: '',
      database: 'MiniStorizDb',
    //  host: '139.162.169.45',
    //  port: 3306,
    //  username: 'codesqu1_ministoriez',
    //  password: 'codesqu1_ministoriez',
    //  database: 'codesqu1_ministoriez',
    //  host: '139.162.169.45',
    //   port: 3306,
    //  username: 'codesqu1_ministoriez',
    //   password: 'codesqu1_ministoriez',
    //   database: 'codesqu1_ministoriez',
      entities: [User, Relation, Message, Histoire, Planche, Impression],
      synchronize: true,
      logging: true,
    }),
    
    UsersModule,
    RelationsModule,
    MessagesModule,
    HistoiresModule,
    ImpressionsModule,
    PlanchesModule,
  ],
  providers: [AppService],
  controllers: [TelechargementController, AppController],
})
export class AppModule {}