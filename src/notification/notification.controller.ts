import { Controller, Get, Res, Param, HttpStatus, Post, Body, Put, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';

@Controller('notification')
export class NotificationController {
    constructor(private service: NotificationService) {}
    @Get('/for/:id')
    getNotifications(@Res() res,@Param() params) {
        return this.service.getNotification(params.id).then(notifications=>{
                    return res.status(HttpStatus.OK).json(notifications);
                
            })
    }
    @Get('/nbrNotification/:id')
    getNbrMessage(@Res() res,@Param() params) {
        return this.service.getNumberVue(params.id).then(messages=>{
                    return res.status(HttpStatus.OK).json(messages);
            })
    }
    @Post()
    create(@Body() notification: Notification, @Res() res) {
        return this.service.createNotification(notification).then(notification=>{
            return res.status(HttpStatus.OK).json(notification);
        });
    }

    @Put()
    update(@Body() notification: Notification, @Res() res) {
        return this.service.updateNotification(notification).then(notification=>{
            return res.status(HttpStatus.OK).json(notification);
        });
    }

    @Delete(':id')
    deleteNotification(@Param() params, @Res() res) {
        return this.service.deleteNotification(params.id).then(notification=>{
            return res.status(HttpStatus.OK).json(notification);
        });
    }
}
