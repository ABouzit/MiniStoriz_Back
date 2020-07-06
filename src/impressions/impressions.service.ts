import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Impression } from './impression.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { HistoiresService } from 'src/histoires/histoires.service';
import { LoggerService } from 'nest-logger';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/notification.entity';

@Injectable()
export class ImpressionsService {
  constructor(
    @InjectRepository(Impression)
    private impressionsRepository: Repository<Impression>,
    @Inject(forwardRef(() => HistoiresService))
    private histoiresService: HistoiresService,
    private usersService: UsersService,
    private notificationService: NotificationService,
  ) {}
  /* public logStuff() {
    this.logger.debug(
      `Found ${result.rowCount} items from db`,
      ImpressionsService.name,
    );
    this.logger.error(
      `Error while getting items from db`,
      err.stack,
      ImpressionsService.name,
    );
  }*/
  getImpressions(): Promise<Impression[]> {
    return this.impressionsRepository.find({ relations: ['histoire', 'user'] });
  }
  countImpressions(): Promise<number> {
    return this.impressionsRepository.count({ relations: ['histoire', 'user'] });
  }
  countImpressionsToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return this.impressionsRepository.count({ relations: ['histoire', 'user'], where: { dateDeCreation: MoreThanOrEqual(start)} });
  }
  getImpression(_id: string): Promise<Impression[]> {
    return this.impressionsRepository.find({
      relations: ['histoire', 'user'],
      select: ['commentaire', 'noteHistoire', 'noteDessin', 'user'],
      where: [{ id: _id }],
    });
  }
  getImpressionsUser(_id: string): Promise<Impression[]> {
    return this.impressionsRepository.find({
      relations: ['histoire', 'user'],
      where: [{ user: _id }],
      order: { dateDeCreation: 'DESC' },
    });
  }
  getImpressionsHistoire(_id: string): Promise<Impression[]> {
    return this.impressionsRepository.find({
      relations: ['histoire', 'user'],
      where: [{ histoire: _id }],
      order: { dateDeCreation: 'DESC' },
    });
  }
  getImpressionsHistoirebyNumberAndSkip(
    number: number,
    nbr: number,
    _id: string,
  ): Promise<Impression[]> {
    return this.impressionsRepository.find({
      relations: ['histoire', 'user'],
      where: [{ histoire: _id }],
      skip: nbr,
      take: number,
      order: { dateDeCreation: 'DESC' },
    });
  }
  getImpressionsHistoireByNumber(
    number: number,
    _id: string,
  ): Promise<Impression[]> {
    return this.impressionsRepository.find({
      relations: ['histoire', 'user'],
      where: [{ histoire: _id }],
      take: number,
      order: { dateDeCreation: 'DESC' },
    });
  }
  getPermitionImp(_id: string, _id2: string): Promise<any> {
    let _permition = true;
    return this.impressionsRepository
      .find({
        relations: ['histoire', 'user'],
        select: ['commentaire', 'noteHistoire', 'noteDessin', 'user'],
        where: [{ histoire: _id, user: _id2 }],
      })
      .then(result => {
        if (result.length > 0) {
          _permition = false;
        }

        return Promise.resolve({
          permition: _permition,
        });
      });
  }
  getHistoireNotes(_id: string): Promise<any> {
    let _noteMoyText = 0;
    let _noteMoyDessins = 0;
    let _counter = 0;
    let _counter2 = 0;
    return this.impressionsRepository
      .find({
        relations: ['histoire', 'user'],
        select: ['commentaire', 'noteHistoire', 'noteDessin', 'user'],
        where: [{ histoire: _id }],
      })
      .then(result => {
        result.map((imp, index) => {
          if (imp.noteDessin > 0 || imp.noteHistoire > 0) {
            _noteMoyDessins += imp.noteDessin;
            _noteMoyText += imp.noteHistoire;
            _counter += 1;
          }
          if (imp.noteDessin == 0 && imp.noteHistoire == 0) {
            _counter2 += 1;
          }
            
        });

        return Promise.resolve({
          noteMoyText: _noteMoyText,
          noteMoyDessins: _noteMoyDessins,
          index: _counter,
          counter: _counter2
        });
      });
  }
  createImpression(imp: Impression): Promise<any> {
    const impression = imp;
    const histoire = impression.histoire;
    let userText = new User();
    let userDessin = new User();
    return this.getHistoireNotes(impression.histoire.id).then(notes => {
      console.log(notes)
      console.log(impression.noteDessin)
      console.log(impression.noteHistoire)
      if (impression.noteDessin > 0 || impression.noteHistoire > 0) {
        histoire.noteDessinMoy =
          (notes.noteMoyDessins + impression.noteDessin) / (notes.index + 1);
        histoire.noteHistoireMoy =
          (notes.noteMoyText + impression.noteHistoire) / (notes.index + 1);
          histoire.nombreComment = notes.counter;
      } else {
        histoire.nombreComment = notes.counter + 1;
      }
      
      return this.histoiresService.updateHistoire(histoire).then(() => {
        if (!impression.histoire.userText) {
          return this.histoiresService
            .rateDessinByUser(impression.histoire.userDessin.id)
            .then(res => {
              // res.data.noteHistoireMoy
              userDessin = impression.histoire.userDessin;
              if (res.noteHistoireMoy > 0) {
                userDessin.noteHistoire = res.noteHistoireMoy;
              } else {
                userDessin.noteHistoire = 0;
              }
              return this.usersService.updateUser(userDessin).then(us2 => {
                if (userDessin.id !== impression.user.id) {
                  const notification = new Notification();
                  notification.lienDessin = impression.user.lienPhoto;
                  notification.pseudo = impression.user.pseudo;
                  notification.text =
                    ' a commenté votre histoire ' +
                    histoire.titreHistoire +
                    '.';
                  notification.user = userDessin.id;
                  notification.lien = '/Histoire/' + histoire.id;
                  return this.notificationService
                    .createNotification(notification)
                    .then(result => {
                      return this.impressionsRepository.save(impression);
                    });
                } else {
                  return this.impressionsRepository.save(impression);
                }
              });
            });
        } else if (!impression.histoire.userDessin) {
          return this.histoiresService
            .rateTextByUser(impression.histoire.userText.id)
            .then(res => {
              // res.data.noteHistoireMoy
              userText = impression.histoire.userText;
              if (res.noteHistoireMoy > 0) {
                userText.noteHistoire = res.noteHistoireMoy;
              } else {
                userText.noteHistoire = 0;
              }
              return this.usersService.updateUser(userText).then(us2 => {
                if (userText.id !== impression.user.id) {
                  const notification = new Notification();
                  notification.lienDessin = impression.user.lienPhoto;
                  notification.pseudo = impression.user.pseudo;
                  notification.text =
                    ' a commenté votre histoire ' +
                    histoire.titreHistoire +
                    '.';
                  notification.user = userText.id;
                  notification.lien = '/Histoire/' + histoire.id;
                  return this.notificationService
                    .createNotification(notification)
                    .then(result => {
                      return this.impressionsRepository.save(impression);
                    });
                } else {
                  return this.impressionsRepository.save(impression);
                }
              });
            });
        } else if (
          impression.histoire.userDessin.id === impression.histoire.userText.id
        ) {
          return this.histoiresService
            .rateDessinByUser(impression.histoire.userDessin.id)
            .then(res => {
              // res.data.noteHistoireMoy

              userDessin = impression.histoire.userDessin;
              if (res.noteDessinMoy > 0) {
                userDessin.noteDessin = res.noteDessinMoy;
              } else {
                userDessin.noteDessin = 0;
              }

              return this.usersService.updateUser(userDessin).then(us1 => {
                return this.histoiresService
                  .rateTextByUser(us1.id)
                  .then(res => {
                    // res.data.noteHistoireMoy
                    userText = us1;
                    if (res.noteHistoireMoy > 0) {
                      userText.noteHistoire = res.noteHistoireMoy;
                    } else {
                      userText.noteHistoire = 0;
                    }
                    return this.usersService.updateUser(userText).then(us2 => {
                      if (userText.id !== impression.user.id) {
                        const notification = new Notification();
                        notification.lienDessin = impression.user.lienPhoto;
                        notification.pseudo = impression.user.pseudo;
                        notification.text =
                          ' a commenté votre histoire ' +
                          histoire.titreHistoire +
                          '.';
                        notification.user = userText.id;
                        notification.lien = '/Histoire/' + histoire.id;
                        return this.notificationService
                          .createNotification(notification)
                          .then(result => {
                            return this.impressionsRepository.save(impression);
                          });
                      } else {
                        return this.impressionsRepository.save(impression);
                      }
                    });
                  });
              });
            });
        } else {
          return this.histoiresService
            .rateDessinByUser(impression.histoire.userDessin.id)
            .then(res => {
              // res.data.noteHistoireMoy

              userDessin = impression.histoire.userDessin;
              if (res.noteDessinMoy > 0) {
                userDessin.noteDessin = res.noteDessinMoy;
              } else {
                userDessin.noteDessin = 0;
              }

              return this.usersService.updateUser(userDessin).then(us1 => {
                return this.histoiresService
                  .rateTextByUser(impression.histoire.userText.id)
                  .then(res => {
                    // res.data.noteHistoireMoy
                    userText = impression.histoire.userText;
                    if (res.noteHistoireMoy > 0) {
                      userText.noteHistoire = res.noteHistoireMoy;
                    } else {
                      userText.noteHistoire = 0;
                    }

                    return this.usersService.updateUser(userText).then(us2 => {
                      if (
                        userText.id !== impression.user.id ||
                        userDessin.id !== impression.user.id
                      ) {
                        if (userText.id !== impression.user.id) {
                          const notification = new Notification();
                          notification.lienDessin = impression.user.lienPhoto;
                          notification.pseudo = impression.user.pseudo;
                          notification.text =
                            ' a commenté votre histoire ' +
                            histoire.titreHistoire +
                            '.';
                          notification.user = userText.id;
                          notification.lien = '/Histoire/' + histoire.id;
                          return this.notificationService
                            .createNotification(notification)
                            .then(result => {
                              return this.impressionsRepository.save(
                                impression,
                              );
                            });
                        } else {
                          const notification = new Notification();
                          notification.lienDessin = impression.user.lienPhoto;
                          notification.pseudo = impression.user.pseudo;
                          notification.text =
                            ' a commenté votre histoire ' +
                            histoire.titreHistoire +
                            '.';
                          notification.user = userDessin.id;
                          notification.lien = '/Histoire/' + histoire.id;
                          return this.notificationService
                            .createNotification(notification)
                            .then(result => {
                              return this.impressionsRepository.save(
                                impression,
                              );
                            });
                        }
                      } else {
                        return this.impressionsRepository.save(impression);
                      }
                    });
                  });
              });
            });
        }
      });
    });
  }
  updateImpression(impression: Impression) {
    this.impressionsRepository.save(impression);
  }
  deleteImpressionWithRatings(id: string) {
    return this.getImpression(id).then(res => {
      const histoire = res[0].histoire;
      return this.impressionsRepository.delete(id).then(del => {
        return this.getHistoireNotes(histoire.id).then(notes => {
          histoire.noteDessinMoy = notes.noteMoyDessins / notes.index;
          histoire.noteHistoireMoy = notes.noteMoyText / notes.index;
          histoire.nombreComment = notes.index - 1;

          return this.histoiresService.updateHistoire(histoire).then(() => {
            Promise.resolve('Comment deleted');
          });
        });
      });
    });
  }
  deleteImpression(id: string) {
    return this.impressionsRepository.delete(id);
  }
  deleteHistoire(id: string) {
    return this.getImpressionsHistoire(id).then(impressions => {
      return Promise.all(
        impressions.map((impression, index) => {
         return this.deleteImpression(impression.id);
        }),
      ).then(() => {
        return this.histoiresService.deleteHistoire(id);
      });
    });
  }
}
