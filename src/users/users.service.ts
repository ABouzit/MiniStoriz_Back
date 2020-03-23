
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './user.entity';
import firebase = require('firebase');
import admin = require('firebase-admin');
import { request } from 'http';
import { FirebaseService } from './firebase/firebase.service';
import { UserInfo } from './firebase/userInfo.class';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private firebaseService: FirebaseService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUsersSearch(search: string): Promise<string[]> {
    let data = [];
    return this.usersRepository.find({select: ['id'],where: { pseudo: Like('%'+search+'%') }}).then(result => {
      
      return Promise.all(result.map((row,index)=>{
        data.push(row.id)
      })).then(()=> {return data});
    });
  }

  getUser(_id: number): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        'id',
        'prenom',
        'nom',
        'pseudo',
        'email',
        'ville',
        'motDePasse',
        'nombreHistoire',
        'nombreDessin',
        'noteHistoire',
        'noteDessin',
        'isActive',
        'role',
        'dateDeCreation',
        'dateDernierConnexion',
        'lienPhoto',
      ],
      where: [{ id: _id }],
    });
  }
  getUserByEmail(_email: string): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        'id',
        'prenom',
        'nom',
        'pseudo',
        'email',
        'ville',
        'motDePasse',
        'nombreHistoire',
        'nombreDessin',
        'noteHistoire',
        'noteDessin',
        'isActive',
        'role',
        'dateDeCreation',
        'dateDernierConnexion',
        'lienPhoto',
      ],
      where: [{ email: _email }],
    });
  }
   createUser(user: User): Promise<User> {
    const us = this.usersRepository.save(user).catch(function(error) {
      throw new HttpException(
        error, HttpStatus.FORBIDDEN,
      );
    });
    return us;
  }
  updateUser(user: User): Promise<User> {
    console.log(user)
    return this.usersRepository.save(user).catch(function(error) {
      throw new HttpException(
        error, HttpStatus.FORBIDDEN,
      );
    });
  }

  deleteUser(user: User) {
    this.usersRepository.delete(user).catch(function(error) {
      throw new HttpException(
        error, HttpStatus.FORBIDDEN,
      );
    });
  }
  async signUp(user: User) {
    const us = user;
    us.dateDeCreation = new Date();
    us.dateDernierConnexion = new Date();
    const us1 = await this.createUser(us);
    const userInfo = await this.firebaseService.registerWithFirebase(us1);
    console.log(user);
    return userInfo;
  }
  async signIn(user: User) {
    let userInfo={};
    const _this = this;
    let us1 = new User();
    await this.getUserByEmail(user.email).then(async function(result) {
      us1 = result[0];
      us1.dateDernierConnexion = new Date();
      console.log(us1);
      await _this.updateUser(us1).then(async function(result1) {
        userInfo = await _this.firebaseService.loginWithFirebase(result1);
       console.log(JSON.stringify(userInfo));
      
       });
    });
    return userInfo;
  }
  async logOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log('logout success');
      })
      .catch(function(error) {
        throw new HttpException(
          error, HttpStatus.FORBIDDEN,
        );
      });
  }
}
