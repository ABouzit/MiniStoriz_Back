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
                    host: 'ssl0.ovh.net',
                    port: 465,
                    secure: true, // upgrade later with STARTTLS
                    auth: {
                        user: "no-reply@formaconnect.com",
                        pass: "Azerzerzer1993",
                    },
                    },
                    defaults: {
                    from:'"Ministoriz" <no-reply@formaconnect.com>',
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
