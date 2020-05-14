
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

  getUsers(id: string): Promise<any[]> {
    let object = [];
    return this.usersRepository.find().then(users=>{
      return Promise.all(users.map((user,index)=>{
        let x = {user:user,ami:false};
        return this.relationsService.getRelationId(id, user.id).then(res=>{
          if (res == 0) {
            x.ami = false
          } else {
            x.ami = true
          }
          object.push(x)
        })
      })).then(()=>{
        return Promise.resolve(object);  
      })
    })
  }
 
  getAllUsersSearch(id:string,number: number, nbr: number, search:string): Promise<User[]> {
    let object = [];
    if (search == "xxxx") {
      return this.usersRepository.find({ where: {isActive: true, id: Not(id)} ,skip: nbr, take: number, order: {nombreHistoire: 'DESC'},}).then(users=>{
        return Promise.all(users.map((user,index)=>{
          let x = {user:user,ami:false};
          return this.relationsService.getRelationId(id, user.id).then(res=>{
            if (res == 0) {
              x.ami = false
            } else {
              x.ami = true
            }
            object.push(x)
          })
        })).then(()=>{
          return Promise.resolve(object);  
        })
      })
    } else {
        return this.usersRepository.find({ 
            where: [{ pseudo: Like('%'+search+'%'), isActive: true, id: Not(id)},{ nom: Like('%'+search+'%'), isActive: true, id: Not(id)},{ prenom: Like('%'+search+'%'), isActive: true, id: Not(id)}],
             skip: nbr, take: number, order: {nombreHistoire: 'DESC'}}).then(users=>{
              return Promise.all(users.map((user,index)=>{
                let x = {user:user,ami:false};
                return this.relationsService.getRelationId(id, user.id).then(res=>{
                  if (res == 0) {
                    x.ami = false
                  } else {
                    x.ami = true
                  }
                  object.push(x)
                })
              })).then(()=>{
                return Promise.resolve(object);  
              })
            })
    }
  }
  getAllUsersSearchs(id:string, search:string): Promise<User[]> {
    let object = [];
    if (search == "xxxx") {
      return this.usersRepository.find({ where: {isActive: true, id: Not(id)} , order: {nombreHistoire: 'DESC'},}).then(users=>{
        return Promise.all(users.map((user,index)=>{
          return this.relationsService.getRelationIdAccepte(id, user.id).then(res=>{
            if (res > 0) {
              object.push(user)
            }
          })
        })).then(()=>{
          return Promise.resolve(object);  
        })
      })
    } else {
        return this.usersRepository.find({ 
            where: [{ pseudo: Like('%'+search+'%'), isActive: true, id: Not(id)},{ nom: Like('%'+search+'%'), isActive: true, id: Not(id)},{ prenom: Like('%'+search+'%'), isActive: true, id: Not(id)}],
              order: {nombreHistoire: 'DESC'}}).then(users=>{
              return Promise.all(users.map((user,index)=>{
                return this.relationsService.getRelationIdAccepte(id, user.id).then(res=>{
                  if (res > 0) {
                    object.push(user)
                  } 
                })
              })).then(()=>{
                return Promise.resolve(object);  
              })
            })
    }
  }
  getAllUsers(id:string): Promise<User[]> {
    let object = [];
      return this.usersRepository.find({ where: {isActive: true} , order: {nombreHistoire: 'DESC'},}).then(users=>{
        return Promise.all(users.map((user,index)=>{
          if (user.id == id) {
            object.unshift(user)
          } else {
            return this.relationsService.getRelationIdAccepte(id, user.id).then(res=>{
              if (res > 0) {
                object.push(user)
              }
            })
          }
          
        })).then(()=>{
          return Promise.resolve(object);  
        })
      })
  }
  getNumberUsersSearch(search:string) {
    if (search == "xxxx") {
      return this.usersRepository.count({where: {isActive: true}});
    } else {
        return this.usersRepository.count({ 
            where: [{ pseudo: Like('%'+search+'%'), isActive: true},{ nom: Like('%'+search+'%'), isActive: true},{ prenom: Like('%'+search+'%'), isActive: true}]});   
    }
  }
  getUsersSearch(search: string): Promise<string[]> {
    let data = [];
    return this.usersRepository.find({select: ['id'],where: { pseudo: Like('%'+search+'%') }}).then(result => {
      
      return Promise.all(result.map((row,index)=>{
        data.push(row.id)
      })).then(()=> {return data});
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
  updateUsers(user: User){
    const _this = this;
    let us1 = new User();
    let us2 = new User();
    return this.getUserByEmail(user.email).then(function(result) {
      console.log(result.length);
      if (result.length < 1) {
        return "errorUtilisateur";
      } else {
      us2 = result[0]; 
      us1 = result[0];
      const password = us1.motDePasse;
      us1.motDePasse = user.motDePasse;
      return _this.updateUser(us1).then(function(result1) {
        us2.motDePasse = password;
        console.log(result1);
        return _this.firebaseService.changePasswordWithFirebase(us2,user.motDePasse).then(res => {
          console.log(res);
          return res;
        }).catch(function(error) {
          console.log(error);
          return "errorUpdatePasswordFB";
        });
       });
        
      }
    }).catch(function(error) {
      console.log(error);
      return "errorUtilisateur";
    });
  }
  updateNombreHistoire(user: string): Promise<User> {
    return this.getUser(user).then(res =>{
      let userText = res[0];
      userText.nombreHistoire += 1;
      return this.usersRepository.save(userText).catch(function(error) {
        throw new HttpException(
          error, HttpStatus.FORBIDDEN,
        );
      });
    })
  }
  updateNombreDessin(user: string): Promise<User> {
    return this.getUser(user).then(res =>{
      let userText = res[0];
      userText.nombreDessin += 1;
      return this.usersRepository.save(userText).catch(function(error) {
        throw new HttpException(
          error, HttpStatus.FORBIDDEN,
        );
      });
    })
  }
  updateNombreReseau(user: string): Promise<User> {
    return this.getUser(user).then(res =>{
      let userText = res[0];
      userText.nombreReseau += 1;
      return this.usersRepository.save(userText).catch(function(error) {
        throw new HttpException(
          error, HttpStatus.FORBIDDEN,
        );
      });
    })
  }
  updateRelation(relation: Relation,id: string) {
      
      return this.relationsService.getRelation(relation.id).then(relat => {
      const rel = relat[0];
      let userOne = rel.userOne;
      let userTwo = rel.userTwo;
      
      if(relation.isActive == true){
          return this.updateNombreReseau(userOne.id).then(ress => {
              return this.updateNombreReseau(userTwo.id).then(rss => {
                  return this.relationsService.updateRelation(relation).then(res=>{
                    let notification = new Notification();
                    if (userOne.id == id) {
                      notification.lienDessin = userOne.lienPhoto;
                      notification.pseudo = userOne.pseudo;
                      notification.text = " a accepté votre demande.";
                      notification.user = userTwo.id;
                      notification.lien = "/LesOeuvres/" + userOne.id;
                    } else {
                      notification.lienDessin = userTwo.lienPhoto;
                      notification.pseudo = userTwo.pseudo;
                      notification.text = " a accepté votre demande.";
                      notification.user = userOne.id;
                      notification.lien = "/LesOeuvres/" + userTwo.id;
                    }
                    notification.lien
                    return this.notificationService.createNotification(notification);
                  })
              });
          })
      }else{
          return this.relationsService.updateRelation(relation);
      }
      })  
      
  }
  deleteUser(user: User) {
    this.usersRepository.delete(user).catch(function(error) {
      throw new HttpException(
        error, HttpStatus.FORBIDDEN,
      );
    });
  }
  updatePassword(user: User){
    const _this = this;
    let us1 = new User();
    let us2 = new User();
    return this.getUserByEmail(user.email).then(function(result) {
      console.log(result.length);
      if (result.length < 1) {
        return "errorUtilisateur";
      } else {
      us2 = result[0]; 
      us1 = result[0];
      const password = us1.motDePasse;
      us1.motDePasse = user.motDePasse;
      return _this.updateUser(us1).then(function(result1) {
        us2.motDePasse = password;
        console.log(user);
        return _this.firebaseService.changePasswordWithFirebase(us2,user.motDePasse).then(res => {

          return _this.massagesService.sendEmailUpdatePassword(user.pseudo,us1.email,us1.pseudo);
        }).catch(function(error) {
          console.log(error);
          return "errorUpdatePasswordFB";
        });
       });
        
      }
    }).catch(function(error) {
      console.log(error);
      return "errorUtilisateur";
    });
  }
  signUp(user: User) {
    const _this = this;
    const us = user;
    const lien = user.lienPhoto;
    us.lienPhoto = "";
    us.dateDeCreation = new Date();
    us.dateDernierConnexion = new Date();
    return this.createUser(us).then(res => {
      return this.firebaseService.registerWithFirebase(res).then(ress => {
        _this.massagesService.sendEmailActivation(lien+res.id,user.email,user.pseudo);
           return ress;
      }).catch(function(error) {
        console.log(error)
        throw new HttpException(
          error, HttpStatus.FORBIDDEN,
        );
      });
      
    }).catch(function(error) {
      return "exist";
    });
    
  }
  signIn(user: User) {
    let userInfo={};
    const _this = this;
    let us1 = new User();
    let us2 = new User();
    return this.getUserByEmail(user.email).then(function(result) {
      if (result.length < 1) {
        return "errorUtilisateur";
      } else {
       
      us1 = result[0];
      us1.dateDernierConnexion = new Date();
      // console.log(us1);
      return _this.updateUser(us1).then(function(result1) {
        us2 = result1;
        
        us2.motDePasse = user.motDePasse;console.log(us2)
        return _this.firebaseService.loginWithFirebase(us2).then(res => {
          if (!us2.isActive) {
            return "errorActivation";
          } else {
            return res;
          }
          
        }).catch(function(error) {
          console.log(error);
          return "errorPassword";
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
        throw new HttpException(
          error, HttpStatus.FORBIDDEN,
        );
      });
  }
}
