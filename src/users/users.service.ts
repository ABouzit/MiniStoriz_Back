
import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { User } from './user.entity';
import firebase = require('firebase');
import admin = require('firebase-admin');
import { request } from 'http';
import { FirebaseService } from './firebase/firebase.service';
import { UserInfo } from './firebase/userInfo.class';
import { MessagesService } from 'src/messages/messages.service';
import { RelationsService } from 'src/relations/relations.service';
import { Relation } from 'src/relations/relation.entity';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/notification.entity';
import moment = require('moment');
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private firebaseService: FirebaseService,
    private massagesService: MessagesService,
    private relationsService: RelationsService,
    private notificationService: NotificationService,
  ) {}

  getUsersAdmin(): Promise<any[]> {
    return this.usersRepository.find();
  }
  getUsersAdminOrderBySignal(): Promise<any[]> {
    return this.usersRepository.find({
      order: { nombreSignaler: 'DESC' },
    });
  }
  countUsers(): Promise<number>{
    return this.usersRepository.count();
  }
  getUsersAdminActiveDesactive(): Promise<any[]> {
    return this.usersRepository.find({
      where: [
        {
          demandeActivation: true,
        },
        { demandeResignation: true },
      ],
    });
  }
  countUsersAdminActive(): Promise<number> {
    return this.usersRepository.count({
      where:
        {
          demandeActivation: true,
        },

    });
  }
  countUsersAdminDesactive(): Promise<number> {
    return this.usersRepository.count({
      where:
        { demandeResignation: true },

    });
  }
  getUsers(id: string): Promise<any[]> {
    const object = [];
    return this.usersRepository.find().then(users => {
      return Promise.all(
        users.map((user, index) => {
          const x = { user, ami: false };
          return this.relationsService.getRelationId(id, user.id).then(res => {
            if (res === 0) {
              x.ami = false;
            } else {
              x.ami = true;
            }
            object.push(x);
          });
        }),
      ).then(() => {
        return Promise.resolve(object);
      });
    });
  }

  getAllUsersSearch(
    id: string,
    number: number,
    nbr: number,
    search: string,
  ): Promise<User[]> {
    const object = [];
    if (search === 'xxxx') {
      return this.usersRepository
        .find({
          where: { isActive: true, id: Not(id) },
          skip: nbr,
          take: number,
          order: { nombreHistoire: 'DESC' },
        })
        .then(users => {
          return Promise.all(
            users.map((user, index) => {
              const x = { user, ami: 0 };
              return this.relationsService
                .getRelationEnv(id, user.id)
                .then(res => {
                  if (res === 0) {
                    return this.relationsService
                      .getRelationIdAccepte(id, user.id)
                      .then(res => {
                        if (res > 0) {
                          x.ami = 2;
                        }
                        return this.relationsService
                          .getRelationRec(user.id,id )
                          .then(res => {
                            if (res > 0) {
                              x.ami = 3;
                            }
                            object.push(x);
                          });
                      });
                  } else {
                    x.ami = 1;
                    return this.relationsService
                      .getRelationRec(user.id,id )
                      .then(res => {
                        if (res > 0) {
                          x.ami = 3;
                        }
                        object.push(x);
                      });
                  }
                });
                
            }),
          ).then(() => {
            return Promise.resolve(object);
          });
        });
    } else {
      return this.usersRepository
        .find({
          where: [
            { pseudo: Like('%' + search + '%'), isActive: true, id: Not(id) },
            { nom: Like('%' + search + '%'), isActive: true, id: Not(id) },
            { prenom: Like('%' + search + '%'), isActive: true, id: Not(id) },
          ],
          skip: nbr,
          take: number,
          order: { nombreHistoire: 'DESC' },
        })
        .then(users => {
          return Promise.all(
            users.map((user, index) => {
              const x = { user, ami: false };
              return this.relationsService
                .getRelationId(id, user.id)
                .then(res => {
                  if (res === 0) {
                    x.ami = false;
                  } else {
                    x.ami = true;
                  }
                  object.push(x);
                });
            }),
          ).then(() => {
            return Promise.resolve(object);
          });
        });
    }
  }
  getAllUsersSearchs(id: string, search: string): Promise<User[]> {
    const object = [];
    if (search === 'xxxx') {
      return this.usersRepository
        .find({
          where: { isActive: true, id: Not(id) },
          order: { nombreHistoire: 'DESC' },
        })
        .then(users => {
          return Promise.all(
            users.map((user, index) => {
              return this.relationsService
                .getRelationIdAccepte(id, user.id)
                .then(res => {
                  if (res > 0) {
                    object.push(user);
                  }
                });
            }),
          ).then(() => {
            return Promise.resolve(object);
          });
        });
    } else {
      return this.usersRepository
        .find({
          where: [
            { pseudo: Like('%' + search + '%'), isActive: true, id: Not(id) },
            { nom: Like('%' + search + '%'), isActive: true, id: Not(id) },
            { prenom: Like('%' + search + '%'), isActive: true, id: Not(id) },
          ],
          order: { nombreHistoire: 'DESC' },
        })
        .then(users => {
          return Promise.all(
            users.map((user, index) => {
              return this.relationsService
                .getRelationIdAccepte(id, user.id)
                .then(res => {
                  if (res > 0) {
                    object.push(user);
                  }
                });
            }),
          ).then(() => {
            return Promise.resolve(object);
          });
        });
    }
  }
  getAllUsers(id: string): Promise<User[]> {
    const object = [];
    return this.usersRepository
      .find({ where: { isActive: true }, order: { nombreHistoire: 'DESC' } })
      .then(users => {
        console.log(users)
        return Promise.all(
          users.map((user, index) => {
            if (user.id === id) {
              object.unshift(user);
            } else {
              return this.relationsService
                .getRelationIdAccepte(id, user.id)
                .then(res => {
                  if (res > 0) {
                    object.push(user);
                  }
                });
            }
          }),
        ).then(() => {
          return Promise.resolve(object);
        });
      });
  }
  getNumberUsersSearch(search: string) {
    if (search === 'xxxx') {
      return this.usersRepository.count({ where: { isActive: true } });
    } else {
      return this.usersRepository.count({
        where: [
          { pseudo: Like('%' + search + '%'), isActive: true },
          { nom: Like('%' + search + '%'), isActive: true },
          { prenom: Like('%' + search + '%'), isActive: true },
        ],
      });
    }
  }
  getUsersSearch(search: string): Promise<string[]> {
    const data = [];
    return this.usersRepository
      .find({ select: ['id'], where: { pseudo: Like('%' + search + '%') } })
      .then(result => {
        return Promise.all(
          result.map((row, index) => {
            data.push(row.id);
          }),
        ).then(() => {
          return data;
        });
      });
  }

  getUser(_id: string): Promise<User[]> {
    return this.usersRepository.find({
      where: [{ id: _id }],
    });
  }
  getUserByEmail(_email: string): Promise<User[]> {
    return this.usersRepository.find({
      where: [{ email: _email }],
    });
  }
  getDispoLogin(_email: string): Promise<any> {
    return this.usersRepository.find({
      select: ['methode'],
      where:
      {
        email: _email
      },
    });
  }
  createUser(user: User): Promise<User> {
    return this.usersRepository.save(user).catch(function(error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });;
  }
  updateUser(user: User): Promise<User> {
    console.log(user);
    return this.usersRepository.save(user).catch(function(error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });
  }
  bloquerUser(user: User, nombreJours: number): Promise<User> {
    console.log(user);
    console.log(nombreJours);
    const us = user;
    const dateBloque = moment().add(nombreJours, 'days');
    us.dateDebloque = dateBloque.toDate();
    return this.usersRepository.save(us).catch(function(error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });
  }
  debloquerUser(user: User): Promise<User> {
    console.log(user);
    const us = user;
    // let dateBloque = moment().add(nombreJours, 'days');
    us.dateDebloque = null;
    return this.usersRepository.save(us).catch(function(error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });
  }

  updateUsers(user: User) {
    const _this = this;
    let us1 = new User();
    let us2 = new User();
    return this.getUserByEmail(user.email)
      .then(function(result) {
        console.log(result.length);
        if (result.length < 1) {
          return 'errorUtilisateur';
        } else {
          us2 = result[0];
          us1 = result[0];
          const password = us1.motDePasse;
          user.id = us1.id;
          return _this.updateUser(user).then(function(result1) {
            if (user.motDePasse == "wp7DqWU=" || user.motDePasse == null) {
              return result1;
            } else {
              us2.motDePasse = password;
              console.log(result1);
              return _this.firebaseService
                .changePasswordWithFirebase(us2, user.motDePasse)
                .then(res => {
                  console.log(res);
                  return res;
                })
                .catch(function(error) {
                  console.log(error);
                  return 'errorUpdatePasswordFB';
              });
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        return 'errorUtilisateur';
      });
  }
  updateNombreHistoire(user: string): Promise<User> {
    return this.getUser(user).then(res => {
      const userText = res[0];
      userText.nombreHistoire += 1;
      return this.usersRepository.save(userText).catch(function(error) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
    });
  }
  updateNombreDessin(user: string): Promise<User> {
    return this.getUser(user).then(res => {
      const userText = res[0];
      userText.nombreDessin += 1;
      return this.usersRepository.save(userText).catch(function(error) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
    });
  }
  updateNombreReseau(user: string): Promise<User> {
    return this.getUser(user).then(res => {
      const userText = res[0];
      userText.nombreReseau += 1;
      return this.usersRepository.save(userText).catch(function(error) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
    });
  }
  updateNombreReseau2(user: string): Promise<User> {
    return this.getUser(user).then(res => {
      const userText = res[0];
      userText.nombreReseau -= 1;
      return this.usersRepository.save(userText).catch(function(error) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
    });
  }
  updateRelation(relation: Relation, id: string) {
    return this.relationsService.getRelation(relation.id).then(relat => {
      const rel = relat[0];
      const userOne = rel.userOne;
      const userTwo = rel.userTwo;

      if (relation.isActive === true) {
        return this.updateNombreReseau(userOne.id).then(ress => {
          return this.updateNombreReseau(userTwo.id).then(rss => {
            return this.relationsService.updateRelation(relation).then(res => {
              const notification = new Notification();
              if (userOne.id === id) {
                notification.lienDessin = userOne.lienPhoto;
                notification.pseudo = userOne.pseudo;
                notification.text = ' a accepté votre demande.';
                notification.user = userTwo.id;
                notification.lien = '/LesOeuvres/' + userOne.id;
              } else {
                notification.lienDessin = userTwo.lienPhoto;
                notification.pseudo = userTwo.pseudo;
                notification.text = ' a accepté votre demande.';
                notification.user = userOne.id;
                notification.lien = '/LesOeuvres/' + userTwo.id;
              }
              notification.lien;
              return this.notificationService.createNotification(notification);
            });
          });
        });
      } else {
        return this.relationsService.updateRelation(relation);
      }
    });
  }
  updateRelation2(id: string, id2: string) {
    return this.relationsService.getRelationByUsers(id, id2).then(relat => {console.log(relat)
      let rel = relat[0];
      
      const userOne = rel.userOne;
      const userTwo = rel.userTwo;
      rel.isActive = true;
        return this.updateNombreReseau(userOne.id).then(ress => {
          return this.updateNombreReseau(userTwo.id).then(rss => {
            return this.relationsService.updateRelation(rel).then(res => {
              const notification = new Notification();
              if (userOne.id === id) {
                notification.lienDessin = userOne.lienPhoto;
                notification.pseudo = userOne.pseudo;
                notification.text = ' a accepté votre demande.';
                notification.user = userTwo.id;
                notification.lien = '/LesOeuvres/' + userOne.id;
              } else {
                notification.lienDessin = userTwo.lienPhoto;
                notification.pseudo = userTwo.pseudo;
                notification.text = ' a accepté votre demande.';
                notification.user = userOne.id;
                notification.lien = '/LesOeuvres/' + userTwo.id;
              }
              return this.notificationService.createNotification(notification);
            });
          });
        });
    });
  }
  deleteRelation(id: string, id2: string) {
    return this.relationsService.getRelationByUsers(id, id2).then(relat => {console.log(relat)
      let rel = relat[0];
      
      const userOne = rel.userOne;
      const userTwo = rel.userTwo;
      if (rel.isActive == true) {
        return this.updateNombreReseau2(userOne.id).then(ress => {
          return this.updateNombreReseau2(userTwo.id).then(rss => {
            return this.relationsService.deleteRelationById(id,id2)
          });
        });
      } else {
        return this.relationsService.deleteRelationById(id,id2)
      }
    });
  }
  deleteUser(user: User) {
    this.usersRepository.delete(user).catch(function(error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });
  }
  updatePassword(user: User) {
    const _this = this;
    let us1 = new User();
    let us2 = new User();
    return this.getUserByEmail(user.email)
      .then(function(result) {
        console.log(result.length);
        if (result.length < 1) {
          return 'errorUtilisateur';
        } else {
          us2 = result[0];
          us1 = result[0];
          const password = us1.motDePasse;
          us1.motDePasse = user.motDePasse;
          return _this.updateUser(us1).then(function(result1) {
            us2.motDePasse = password;
            console.log(user);
            return _this.firebaseService
              .changePasswordWithFirebase(us2, user.motDePasse)
              .then(res => {
                return _this.massagesService.sendEmailUpdatePassword(
                  user.pseudo,
                  us1.email,
                  us1.pseudo,
                );
              })
              .catch(function(error) {
                console.log(error);
                return 'errorUpdatePasswordFB';
              });
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        return 'errorUtilisateur';
      });
  }
  signUp(user: User) {
    const _this = this;
    const us = user;
    const lien = user.lienPhoto;
    us.lienPhoto = '';
    us.dateDeCreation = new Date();
    us.dateDernierConnexion = new Date();
    return this.createUser(us)
      .then(res => {
        return this.firebaseService
          .registerWithFirebase(res)
          .then(ress => {
            _this.massagesService.sendEmailActivation(
              lien + res.id,
              user.email,
              user.pseudo,
            );
            return ress;
          })
          .catch(function(error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.FORBIDDEN);
          });
      })
      .catch(function(error) {
        return 'exist';
      });
  }
  signIn(user: User) {
    const userInfo = {};
    const _this = this;
    let us1 = new User();
    let us2 = new User();
    return this.getUserByEmail(user.email).then(function(result) {
      if (result.length < 1) {
        return 'errorUtilisateur';
      } else {
        us1 = result[0];
        us1.dateDernierConnexion = new Date();
        return _this.updateUser(us1).then(function(result1) {
            us2 = result1;

            us2.motDePasse = user.motDePasse;
            console.log(us2);
            return _this.firebaseService
              .loginWithFirebase(us2)
              .then(res => {
                if (!us2.isActive) {
                  return 'errorActivation';
                }
                if (
                  us1.dateDebloque &&
                  moment(us1.dateDebloque).diff(moment(new Date())) > 0
                ) {
                  return (
                    'vous avez ete bloquee jusqu\'au ' +
                    moment(us1.dateDebloque)
                      .format('DD/MM/YYYY à HH:mm:ss')
                      .toString()
                  );
                }
                if (us1.isDesactive) {
                  return { error: 'errorDesactive', user: us1 };
                } else {
                  return res;
                }
              })
              .catch(function(error) {
                console.log(error);
                return 'errorPassword';
              });
          });

      }
    });
  }
  signUpMethode(user: any) {
    const _this = this;
    let us1 = new User();
    let userInfo = new UserInfo();
    us1.email = user.email;
    us1.lienPhoto = user.lienPhoto;
    us1.pseudo = user.pseudo;
    us1.prenom = user.prenom;
    us1.nom = user.nom;
    us1.isActive = true;
    us1.methode = user.methode;
    userInfo.pseudo = user.pseudo;
    userInfo.lienPhoto = user.lienPhoto;
    userInfo.token = user.token;
    return this.getUserByEmail(user.email).then(function(result) {
      if (result.length < 1) {
        us1.dateDeCreation = new Date();
        us1.dateDernierConnexion = new Date();
        us1.ville = 'aucune';
        return _this.createUser(us1)
          .then(resUser => {
            console.log(us1)
            userInfo.message = 'utilisateur cree avec succes';
            userInfo.id = resUser.id;
            return userInfo
          })
      } else {
        userInfo.id = result[0].id;
        userInfo.lienPhoto = result[0].lienPhoto;
        userInfo.pseudo = result[0].pseudo;
        us1.dateDernierConnexion = new Date();
        return userInfo;
      }
    });
  }
  async logOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log('logout success');
      })
      .catch(function(error) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      });
  }
}
