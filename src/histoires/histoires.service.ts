import { Injectable } from '@nestjs/common';
import { Histoire } from './histoire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PlanchesService } from 'src/planches/planches.service';
import { ImpressionsService } from 'src/impressions/impressions.service';
import { Notification } from 'src/notification/notification.entity';
import { NotificationService } from 'src/notification/notification.service';
import { IsNull } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Planche } from 'src/planches/planche.entity';
@Injectable()
export class HistoiresService {
  constructor(
    @InjectRepository(Histoire)
    private histoiresRepository: Repository<Histoire>,
    private usersService: UsersService,
    private planchesService: PlanchesService,
    private notificationService: NotificationService,
  ) {}

  getHistoires(): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      order: { dateDeCreation: 'DESC' },
    });
  }
  countHistoires(): Promise<number> {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
    });
  }
  getHistoiresWithStat(etat): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: etat }],
      order: { dateDeCreation: 'DESC' },
    });
  }
  countHistoiresWithStat(etat): Promise<any> {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: etat }],
      order: { dateDeCreation: 'DESC' },
    });
  }
  getHistoiresWithDemandeSuppression(etat): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ demandeSuppression: true }],
      order: { dateDeCreation: 'DESC' },
    });
  }
  countHistoiresWithDemandeSuppression(etat): Promise<number> {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [{ demandeSuppression: true }],
      order: { dateDeCreation: 'DESC' },
    });
  }
  getHistoiresByNbrVue(): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: 'VALIDE' }],
      order: { nombreVue: 'DESC' },
      take: 3,
    });
  }
  getHistoiresByPopulaire(): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: 'VALIDE' }],
      order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
      take: 3,
    });
  }
  getHistoiresPlusRecent(): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: 'VALIDE' }],
      order: { dateDeCreation: 'DESC' },
      take: 3,
    });
  }
  getHistoiresPlusAncien(): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: 'VALIDE' }],
      order: { dateDeCreation: 'ASC' },
      take: 3,
    });
  }
  getHistoiresByNbrVues(): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: 'VALIDE' }],
      order: { nombreVue: 'DESC' },
    });
  }
  getHistoiresByPopulaires(): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: 'VALIDE' }],
      order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
    });
  }
  getHistoiresPlusRecents(): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: 'VALIDE' }],
      order: { dateDeCreation: 'DESC' },
    });
  }
  getHistoiresPlusAnciens(): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ etatHistoire: 'VALIDE' }],
      order: { dateDeCreation: 'ASC' },
    });
  }
  getUserHistoires(id) {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ userText: id }, { userDessin: id }],
      order: { dateDeCreation: 'DESC' },
    });
  }
  getNumberOfHistoiresSearchByMe(
    number: number,
    nbr: number,
    filtre: number,
    search: string,
    id: string,
  ): Promise<Histoire[]> {
    if (filtre == 1) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ userText: id }, { userDessin: id }],
          skip: nbr,
          take: number,
          order: { nombreVue: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              userText: id,
              titreHistoire: Like('%' + search + '%'),
            },
            {
              userDessin: id,
              titreHistoire: Like('%' + search + '%'),
            },
          ],
          skip: nbr,
          take: number,
          order: { nombreVue: 'DESC' },
        });
      }
    } else if (filtre == 2) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ userText: id }, { userDessin: id }],
          skip: nbr,
          take: number,
          order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              userText: id,
              titreHistoire: Like('%' + search + '%'),
            },
            {
              userDessin: id,

              titreHistoire: Like('%' + search + '%'),
            },
          ],
          skip: nbr,
          take: number,
          order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
        });
      }
    } else if (filtre == 3) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ userText: id }, { userDessin: id }],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              userText: id,
              titreHistoire: Like('%' + search + '%'),
            },
            {
              userDessin: id,
              titreHistoire: Like('%' + search + '%'),
            },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'DESC' },
        });
      }
    } else if (filtre == 4) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ userText: id }, { userDessin: id }],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'ASC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              userText: id,
              titreHistoire: Like('%' + search + '%'),
            },
            {
              userDessin: id,
              titreHistoire: Like('%' + search + '%'),
            },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'ASC' },
        });
      }
    }
  }

  getNumberOfHistoiresSearchByUser(
    number: number,
    nbr: number,
    filtre: number,
    search: string,
    id: string,
  ): Promise<Histoire[]> {
    if (filtre == 1) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            { userText: id, etatHistoire: 'VALIDE' },
            { userDessin: id, etatHistoire: 'VALIDE' },
          ],
          skip: nbr,
          take: number,
          order: { nombreVue: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              userText: id,
              titreHistoire: Like('%' + search + '%'),
              etatHistoire: 'VALIDE',
            },
            {
              userDessin: id,
              etatHistoire: 'VALIDE',
              titreHistoire: Like('%' + search + '%'),
            },
          ],
          skip: nbr,
          take: number,
          order: { nombreVue: 'DESC' },
        });
      }
    } else if (filtre == 2) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            { etatHistoire: 'VALIDE', userText: id },
            { etatHistoire: 'VALIDE', userDessin: id },
          ],
          skip: nbr,
          take: number,
          order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              userText: id,
              titreHistoire: Like('%' + search + '%'),
              etatHistoire: 'VALIDE',
            },
            {
              userDessin: id,
              etatHistoire: 'VALIDE',
              titreHistoire: Like('%' + search + '%'),
            },
          ],
          skip: nbr,
          take: number,
          order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
        });
      }
    } else if (filtre == 3) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            { userText: id, etatHistoire: 'VALIDE' },
            { userDessin: id, etatHistoire: 'VALIDE' },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              userText: id,
              titreHistoire: Like('%' + search + '%'),
              etatHistoire: 'VALIDE',
            },
            {
              userDessin: id,
              titreHistoire: Like('%' + search + '%'),
              etatHistoire: 'VALIDE',
            },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'DESC' },
        });
      }
    } else if (filtre == 4) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            { userText: id, etatHistoire: 'VALIDE' },
            { userDessin: id, etatHistoire: 'VALIDE' },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'ASC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              userText: id,
              titreHistoire: Like('%' + search + '%'),
              etatHistoire: 'VALIDE',
            },
            {
              userDessin: id,
              titreHistoire: Like('%' + search + '%'),
              etatHistoire: 'VALIDE',
            },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'ASC' },
        });
      }
    }
  }

  getNumberOfHistoires(
    number: number,
    nbr: number,
    filtre: number,
    search: string,
  ): Promise<Histoire[]> {
    if (filtre == 1) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ etatHistoire: 'VALIDE' }],
          skip: nbr,
          take: number,
          order: { nombreVue: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            { titreHistoire: Like('%' + search + '%'), etatHistoire: 'VALIDE' },
          ],
          skip: nbr,
          take: number,
          order: { nombreVue: 'DESC' },
        });
      }
    } else if (filtre == 2) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ etatHistoire: 'VALIDE' }],
          skip: nbr,
          take: number,
          order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            { titreHistoire: Like('%' + search + '%'), etatHistoire: 'VALIDE' },
          ],
          skip: nbr,
          take: number,
          order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
        });
      }
    } else if (filtre == 3) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ etatHistoire: 'VALIDE' }],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            { titreHistoire: Like('%' + search + '%'), etatHistoire: 'VALIDE' },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'DESC' },
        });
      }
    } else if (filtre == 4) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ etatHistoire: 'VALIDE' }],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'ASC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            { titreHistoire: Like('%' + search + '%'), etatHistoire: 'VALIDE' },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'ASC' },
        });
      }
    }
  }
  getNumberOfHistoiresText(
    number: number,
    nbr: number,
    filtre: number,
    search: string,
  ): Promise<Histoire[]> {
    if (filtre == 1) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ userDessin: IsNull(), etatHistoire: 'VALIDE' }],
          skip: nbr,
          take: number,
          order: { nombreVue: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              titreHistoire: Like('%' + search + '%'),
              userDessin: IsNull(),
              etatHistoire: 'VALIDE',
            },
          ],
          skip: nbr,
          take: number,
          order: { nombreVue: 'DESC' },
        });
      }
    } else if (filtre == 2) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ userDessin: IsNull(), etatHistoire: 'VALIDE' }],
          skip: nbr,
          take: number,
          order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              titreHistoire: Like('%' + search + '%'),
              userDessin: IsNull(),
              etatHistoire: 'VALIDE',
            },
          ],
          skip: nbr,
          take: number,
          order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
        });
      }
    } else if (filtre == 3) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ userDessin: IsNull(), etatHistoire: 'VALIDE' }],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'DESC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              titreHistoire: Like('%' + search + '%'),
              userDessin: IsNull(),
              etatHistoire: 'VALIDE',
            },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'DESC' },
        });
      }
    } else if (filtre == 4) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ userDessin: IsNull(), etatHistoire: 'VALIDE' }],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'ASC' },
        });
      } else {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [
            {
              titreHistoire: Like('%' + search + '%'),
              userDessin: IsNull(),
              etatHistoire: 'VALIDE',
            },
          ],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'ASC' },
        });
      }
    }
  }
  getNumberOfHistoiresUsers(
    number: number,
    nbr: number,
    filtre: number,
    search: string,
  ): Promise<Histoire[]> {
    if (filtre == 1) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          where: [{ etatHistoire: 'VALIDE' }],
          skip: nbr,
          take: number,
          order: { nombreVue: 'DESC' },
        });
      } else {
        return this.usersService.getUsersSearch(search).then(result => {
          return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            where: [
              { userText: In(result), etatHistoire: 'VALIDE' },
              { userDessin: In(result), etatHistoire: 'VALIDE' },
            ],
            skip: nbr,
            take: number,
            order: { nombreVue: 'DESC' },
          });
        });
      }
    } else if (filtre == 2) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          skip: nbr,
          take: number,
          order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
        });
      } else {
        return this.usersService.getUsersSearch(search).then(result => {
          return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            where: [
              { userText: In(result), etatHistoire: 'VALIDE' },
              { userDessin: In(result), etatHistoire: 'VALIDE' },
            ],
            skip: nbr,
            take: number,
            order: { noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC' },
          });
        });
      }
    } else if (filtre == 3) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'DESC' },
        });
      } else {
        return this.usersService.getUsersSearch(search).then(result => {
          return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            where: [
              { userText: In(result), etatHistoire: 'VALIDE' },
              { userDessin: In(result), etatHistoire: 'VALIDE' },
            ],
            skip: nbr,
            take: number,
            order: { dateDeCreation: 'DESC' },
          });
        });
      }
    } else if (filtre == 4) {
      if (search == 'xxxx') {
        return this.histoiresRepository.find({
          relations: ['userText', 'userDessin'],
          skip: nbr,
          take: number,
          order: { dateDeCreation: 'ASC' },
        });
      } else {
        return this.usersService.getUsersSearch(search).then(result => {
          return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            where: [
              { userText: In(result), etatHistoire: 'VALIDE' },
              { userDessin: In(result), etatHistoire: 'VALIDE' },
            ],
            skip: nbr,
            take: number,
            order: { dateDeCreation: 'ASC' },
          });
        });
      }
    }
  }
  getHistoire(_id: string): Promise<Histoire[]> {
    return this.histoiresRepository.find({
      relations: ['userText', 'userDessin'],
      where: [{ id: _id }],
    });
  }
  createHistoire(user: Histoire, id: string) {
    const histoire = user;
    const userText = histoire.userText;
    const userDessin = histoire.userDessin;

    histoire.dateDeCreation = new Date();
    if (userText) {
      return this.usersService.updateNombreHistoire(userText.id).then(ress => {
        if (userDessin) {
          return this.usersService
            .updateNombreDessin(userDessin.id)
            .then(rss => {
              return this.histoiresRepository.save(histoire).then(hist => {
                if (userText.id !== userDessin.id) {
                  if (userText.id === id) {
                    const notification = new Notification();
                    notification.lienDessin = userText.lienPhoto;
                    notification.pseudo = userText.pseudo;
                    notification.text =
                      'Vous a inviter a cree avec lui l\'histoire :' +
                      histoire.titreHistoire +
                      '.';
                    notification.user = userDessin.id;
                    notification.lien = '/Histoire/' + histoire.id;
                    return this.notificationService
                      .createNotification(notification)
                      .then(result => {
                        console.log(notification);
                        console.log(histoire);
                        return Promise.resolve(histoire);
                      });
                  } else {
                    const notification = new Notification();
                    notification.lienDessin = userDessin.lienPhoto;
                    notification.pseudo = userDessin.pseudo;
                    notification.text =
                      'Vous a inviter a cree avec lui l\'histoire :' +
                      histoire.titreHistoire +
                      '.';
                    notification.user = userText.id;
                    notification.lien = '/Histoire/' + histoire.id;
                    return this.notificationService
                      .createNotification(notification)
                      .then(result => {
                        console.log(notification);
                        console.log(histoire);
                        return Promise.resolve(histoire);
                      });
                  }
                } else {
                  return this.histoiresRepository.save(histoire);
                }
              });
            });
        } else {
          return this.histoiresRepository.save(histoire);
        }
      });
    } else {
      return this.usersService.updateNombreDessin(userDessin.id).then(rsss => {
        return this.histoiresRepository.save(histoire);
      });
    }
  }
  updateHistoire(histoire: Histoire): Promise<Histoire> {
    const etat = histoire.etatHistoire;
    console.log(etat);
    let userText = new User();
    let userDessin = new User();
    userText = histoire.userText;
    userDessin = histoire.userDessin;
    if (etat == 'ACCEPTER_ILLUSTRATION') {
      this.histoiresRepository
        .find({
          relations: ['userDessin'],
          where: [{ originalHistoire: histoire.originalHistoire }],
        })
        .then(propositions => {
          return Promise.all(
            propositions.map(proposition => {
              if (histoire.id != proposition.id) {
                const notification = new Notification();
                userDessin = proposition.userDessin;
                notification.lienDessin = userText.lienPhoto;
                notification.pseudo = userText.pseudo;
                notification.text =
                  'a déjà choisi des illustrations pour l\'histoire :' +
                  histoire.titreHistoire +
                  '.';
                notification.user = userDessin.id;
                notification.lien = '/Histoire/' + histoire.originalHistoire;
                return this.notificationService
                  .createNotification(notification)
                  .then(result => {
                    return this.planchesService
                      .deletePlancheByHistoire(proposition)
                      .then(res => {
                        return this.histoiresRepository
                          .delete(proposition)
                          .then(res => {
                            return Promise.resolve(histoire);
                          });
                      });
                  });
              } else {
                const notification = new Notification();
                userDessin = proposition.userDessin;
                notification.lienDessin = userText.lienPhoto;
                notification.pseudo = userText.pseudo;
                notification.text =
                  'a accepté vos illustrations pour l\'histoire :' +
                  histoire.titreHistoire +
                  '.';
                notification.user = userDessin.id;
                notification.lien = '/Histoire/' + histoire.originalHistoire;
                return this.notificationService
                  .createNotification(notification)
                  .then(result => {
                    // histoire.id = histoire.originalHistoire;
                    // histoire.originalHistoire = "";
                    return this.histoiresRepository
                      .find({
                        relations: ['userText', 'userDessin'],
                        where: [{ id: histoire.originalHistoire }],
                      })
                      .then(original => {
                        let orig = new Histoire();
                        orig = original[0];
                        orig.etatHistoire = 'EN_ATTANTE';
                        orig.userDessin = histoire.userDessin;
                        return this.planchesService
                          .deletePlancheByHistoire(original[0])
                          .then(res => {
                            return this.histoiresRepository
                              .save(orig)
                              .then(ress => {
                                return this.planchesService
                                  .updatePlancheByHistoire(histoire, orig)
                                  .then(resss => {
                                    return this.histoiresRepository
                                      .delete(histoire)
                                      .then(ress => {
                                        return Promise.resolve(orig);
                                      });
                                  });
                              });
                          });
                      });
                  });
              }
            }),
          );
        });
    } else if (etat == 'REFUSER_ILLUSTRATION') {
      console.log(histoire);
      return this.planchesService
        .getPlancheByHistoire(histoire.id)
        .then(planches => {
          return Promise.all(
            planches.map((planche, index) => {
              return this.planchesService.deletePlanche(planche);
            }),
          ).then(() => {
            const notification = new Notification();
            notification.lienDessin = userText.lienPhoto;
            notification.pseudo = userText.pseudo;
            notification.text =
              'a refusé vos illustrations pour l\'histoire :' +
              histoire.titreHistoire +
              '.';
            notification.user = userDessin.id;
            notification.lien = '/Histoire/' + histoire.originalHistoire;
            return this.notificationService
              .createNotification(notification)
              .then(result => {
                console.log(histoire);
                return this.histoiresRepository
                  .delete(histoire.id)
                  .then(res => {
                    return Promise.resolve(histoire);
                  });
              });
          });
        });
    } else if (etat == 'EN_ATTANTE_USER') {
      if (histoire.id == '') {
        const hiss = new Histoire();
        histoire.id = hiss.id;
      }
      return this.histoiresRepository.save(histoire).then(res => {
        const notification = new Notification();
        notification.lienDessin = userDessin.lienPhoto;
        notification.pseudo = userDessin.pseudo;
        notification.text =
          'Vous a proposé des illustrations pour votre histoire :' +
          histoire.titreHistoire +
          '.';
        notification.user = userText.id;
        notification.lien = '/Histoire/' + res.id;
        return this.notificationService
          .createNotification(notification)
          .then(result => {
            console.log(notification);
            console.log(histoire);

            return Promise.resolve(histoire);
          });
      });
    } else if (etat == 'EN_ATTANTE_UPDATE') {
      if (histoire.id == '') {
        const hiss = new Histoire();
        histoire.id = hiss.id;
      }
      return this.histoiresRepository.save(histoire);
    }
    return this.histoiresRepository.save(histoire);
  }
  updateHistoireWithNotif(
    histoire: Histoire,
    idDessin,
    idText,
    url,
  ): Promise<Histoire> {
    const idD = idDessin;
    const idT = idText;
    histoire.dateDeCreation = new Date();
    return this.histoiresRepository.save(histoire).then(() => {
      if (idD === 'null' || idT === 'null' || idD == idT) {
        if (idD === 'null') {
          const notification = new Notification();
          notification.lienDessin = url + '/images/asset/logo.png';
          notification.pseudo = 'Administrateur';
          notification.text =
            'Votre histoire ' +
            histoire.titreHistoire +
            ' a été ' +
            histoire.etatHistoire +
            '.';
          notification.user = idT;
          notification.lien = '/Histoire/' + histoire.id;
          return this.notificationService
            .createNotification(notification)
            .then(result => {
              console.log(notification);
              console.log(histoire);
              return Promise.resolve(histoire);
            });
        }
        if (idT === 'null') {
          const notification = new Notification();
          notification.lienDessin = url + '/images/asset/logo.png';
          notification.pseudo = 'Administrateur';
          notification.text =
            'Votre histoire ' +
            histoire.titreHistoire +
            ' a été ' +
            histoire.etatHistoire +
            '.';
          notification.user = idD;
          notification.lien = '/Histoire/' + histoire.id;
          return this.notificationService
            .createNotification(notification)
            .then(result => {
              console.log(notification);
              console.log(histoire);
              return Promise.resolve(histoire);
            });
        }
        if (idD === idT) {
          const notification = new Notification();
          notification.lienDessin = url + '/images/asset/logo.png';
          notification.pseudo = 'Administrateur';
          notification.text =
            'Votre histoire ' +
            histoire.titreHistoire +
            ' a été ' +
            histoire.etatHistoire +
            '.';
          notification.user = idD;
          notification.lien = '/Histoire/' + histoire.id;
          return this.notificationService
            .createNotification(notification)
            .then(result => {
              console.log(notification);
              console.log(histoire);
              return Promise.resolve(histoire);
            });
        }
      } else {
        const notification = new Notification();
        const notification2 = new Notification();
        notification.lienDessin = url + '/images/asset/logo.png';
        notification.pseudo = 'Administrateur';
        notification.text =
          'Votre histoire ' +
          histoire.titreHistoire +
          ' a été ' +
          histoire.etatHistoire +
          '.';
        notification.user = idD;
        notification.lien = '/Histoire/' + histoire.id;
        notification.lienDessin = url + '/images/asset/logo.png';
        notification2.pseudo = 'Administrateur';
        notification2.text =
          'Votre histoire ' +
          histoire.titreHistoire +
          ' a été ' +
          histoire.etatHistoire +
          '.';
        notification2.user = idT;
        notification2.lien = '/Histoire/' + histoire.id;
        return this.notificationService
          .createNotification(notification)
          .then(result => {
            console.log(notification);
            console.log(histoire);
            return this.notificationService
              .createNotification(notification2)
              .then(result => {
                console.log(notification2);
                console.log(histoire);
                return Promise.resolve(histoire);
              });
          });
      }
    });
  }
  deleteHistoire(id: string) {
    const histoire = new Histoire();
    histoire.id = id;
    return this.planchesService.getPlancheByHistoire(id).then(planches => {
      return Promise.all(
        planches.map((planche, index) => {
          return this.planchesService.deletePlanche(planche);
        }),
      ).then(() => {
        return this.histoiresRepository.delete(histoire);
      });
    });
  }

  numberHistoire() {
    return this.histoiresRepository.count({ etatHistoire: 'VALIDE' });
  }

  numberHistoireIllistrer() {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [{ userDessin: IsNull(), etatHistoire: 'VALIDE' }],
    });
  }

  numberHistoireByUser(id: string) {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [
        { userText: id, etatHistoire: 'VALIDE' },
        { userDessin: id, etatHistoire: 'VALIDE' },
      ],
    });
  }
  numberHistoireByMe(id: string) {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [{ userText: id }, { userDessin: id }],
    });
  }
  numberHistoireSearch(search: string) {
    return this.histoiresRepository.count({
      titreHistoire: Like('%' + search + '%'),
      etatHistoire: 'VALIDE',
    });
  }
  numberHistoireSearchIllustrer(search: string) {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [
        {
          userDessin: IsNull(),
          titreHistoire: Like('%' + search + '%'),
          etatHistoire: 'VALIDE',
        },
      ],
    });
  }
  numberHistoireSearchByUser(search: string, id: string) {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [
        {
          userText: id,
          titreHistoire: Like('%' + search + '%'),
          etatHistoire: 'VALIDE',
        },
        {
          userDessin: id,
          titreHistoire: Like('%' + search + '%'),
          etatHistoire: 'VALIDE',
        },
      ],
    });
  }
  numberHistoireSearchByMe(search: string, id: string) {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [
        {
          userText: id,
          titreHistoire: Like('%' + search + '%'),
        },
        {
          userDessin: id,
          titreHistoire: Like('%' + search + '%'),
        },
      ],
    });
  }
  numberHistoireSearchUsers(search: string) {
    return this.usersService.getUsersSearch(search).then(result => {
      return this.histoiresRepository.count({
        relations: ['userText', 'userDessin'],
        where: [
          { userText: In(result), etatHistoire: 'VALIDE' },
          { userDessin: In(result), etatHistoire: 'VALIDE' },
        ],
      });
    });
  }
  numberHistoireTextUsers(id: string) {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [{ userText: id, etatHistoire: 'VALIDE' }],
    });
  }
  numberHistoireDessinUsers(id: string) {
    return this.histoiresRepository.count({
      relations: ['userText', 'userDessin'],
      where: [{ userDessin: id, etatHistoire: 'VALIDE' }],
    });
  }
  rateDessinByUser(id: string): Promise<any> {
    let _noteMoyDessins = 0;
    let _index = 0;
    return this.histoiresRepository
      .find({
        relations: ['userText', 'userDessin'],
        select: ['noteDessinMoy'],
        where: [{ userDessin: id }],
      })
      .then(res => {
        return Promise.all(
          res.map((histoire, index) => {
            // if (histoire.noteDessinMoy > 0) {
            _noteMoyDessins += histoire.noteDessinMoy;
            _index = _index + 1;
            // }
          }),
        ).then(() => {
          return Promise.resolve({
            noteDessinMoy: _noteMoyDessins / _index,
          });
        });
      });
  }
  rateTextByUser(id: string): Promise<any> {
    let _noteHistoireMoy = 0;
    let _index = 0;
    return this.histoiresRepository
      .find({
        relations: ['userText', 'userDessin'],
        select: ['noteHistoireMoy'],
        where: [{ userText: id }],
      })
      .then(res => {
        return Promise.all(
          res.map((histoire, index) => {
            if (histoire.noteHistoireMoy > 0) {
              _noteHistoireMoy += histoire.noteHistoireMoy;
              _index = _index + 1;
            }
          }),
        ).then(() => {
          return Promise.resolve({
            noteHistoireMoy: _noteHistoireMoy / _index,
          });
        });
      });
  }
  updateStory(histoire: Histoire) {
   return this.planchesService.getPlancheByHistoire(histoire.id).then(newPlanches => {
     return this.planchesService.getPlancheByHistoire(histoire.originalHistoire).then(oldPlanches => {
        return Promise.all(newPlanches.map((planche, index) => {
        let pl = new Planche();
        pl.index=planche.index;
        pl.isActive=planche.isActive;
        pl.lienDessin=planche.lienDessin;
        pl.text=planche.text;
       pl.id = oldPlanches[index].id;
       pl.histoire = oldPlanches[index].histoire;
       return this.planchesService.createPlanche(pl).then((res) => {
        return this.planchesService.deletePlanche(planche);
       });
           })).then(() => {return this.histoiresRepository.delete(histoire)});
     });
   });
  }
  deleteStory(id: string) {
 return this.planchesService.getPlancheByHistoire(id).then(newPlanches => {
   
       return Promise.all(newPlanches.map((planche, index) => {
           return this.planchesService.deletePlanche(planche);
       })).then(() =>{return this.histoiresRepository.delete({id:id})});
     });
    }
}
