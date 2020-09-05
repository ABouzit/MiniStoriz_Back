import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';
@Module({
    imports: [TypeOrmModule.forFeature([Message]),
                MailerModule.forRoot({
                    transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // upgrade later with STARTTLS
                    auth: {
                        user: "noreplay.Ministoriz@gmail.com",
                        pass: "ministoriz@dmin",
                    },
                    },
                    defaults: {
                    from:'"Ministoriz" <noreplay.Ministoriz@gmail.com>',
                    },
                    template: {
                    dir: process.cwd() + '/templates/',
                    adapter: new HandlebarsAdapter(), // or new PugAdapter()
                    options: {
                        strict: true,
                    },
                    },
                }), ],
    providers: [MessagesService],
    controllers: [MessagesController],
    exports: [TypeOrmModule],
})
export class MessagesModule {}
