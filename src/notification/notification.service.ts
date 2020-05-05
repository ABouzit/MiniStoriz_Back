import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
    ) { }

    getNotification(id: string): Promise<Notification[]> {
        let object = [];
        return this.notificationRepository.find({
            where: { user : id },
            order: { dateDeCreation: 'DESC' }
        }).then(notifications=>{
            return Promise.all(notifications.map((notification,index)=>{
                if (notification.read == false) {
                    notification.read = true;
                    this.notificationRepository.save(notification);
                    
                }  object.push(notification)
              })).then(()=>{
                return Promise.resolve(object);  
            })
          });
    }
    getNumberVue(id: string) {
        return this.notificationRepository.count({
            where: [{ user: id, read: false }]
        });
    }
    createNotification(notification: Notification) {
        return this.notificationRepository.save(notification);
    }
    updateNotification(notification: Notification) {
        return this.notificationRepository.save(notification);
    }

    deleteNotification(id: string) {
        let notification = new Notification();
        notification.id = id;
        return this.notificationRepository.delete(notification);
    }
}
