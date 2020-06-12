
import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { Admin } from './admin.entity';
import firebase = require('firebase');
import admin = require('firebase-admin');
import { request } from 'http';
import { FirebaseService } from './firebase/firebase.service';
import { AdminInfo } from './firebase/adminInfo.class';
import { MessagesService } from 'src/messages/messages.service';
import { RelationsService } from 'src/relations/relations.service';
import { Relation } from 'src/relations/relation.entity';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/notification.entity';
import moment = require('moment');
@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private usersRepository: Repository<Admin>,
    private firebaseService: FirebaseService,
    private massagesService: MessagesService,
  ) {}
  getUsersAdmin(): Promise<any[]> {
    return this.usersRepository.find();
  }
  getUser(_id: string): Promise<Admin[]> {
    return this.usersRepository.find({
      where: [{ id: _id }],
    });
  }
  createUser(user: Admin): Promise<Admin> {
    const us = this.usersRepository.save(user).catch(function(error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });
    return us;
  }
  updateUser(user: Admin): Promise<Admin> {
    console.log(user);
    return this.usersRepository.save(user).catch(function(error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });
  }
  deleteUser(user: Admin) {
    this.usersRepository.delete(user).catch(function(error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    });
  }
  signUp(user: any) {
    const _this = this;
    const us = new Admin();
    us.motDePasse = user.hashedMotDePasse;
    us.pseudo = user.pseudo;
    us.email = user.email;
    us.dateDeCreation = new Date();
    us.dateDernierConnexion = new Date();
    return this.createUser(us)
      .then(res => {
        return this.firebaseService
          .registerWithFirebase(res)
          .then(ress => {
            _this.massagesService.sendEmailAdmin(
              user.motDePasse,
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
  getUserByEmail(_email: string): Promise<Admin[]> {
    return this.usersRepository.find({
      where: [{ email: _email }],
    });
  }
  signIn(user: Admin) {
    const userInfo = {};
    const _this = this;
    let us1 = new Admin();
    let us2 = new Admin();
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
                else{ return res;}
                 
              })
              .catch(function(error) {
                console.log(error);
                return 'errorPassword';
              });
          });

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
