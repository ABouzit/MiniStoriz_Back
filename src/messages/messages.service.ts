import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Brackets } from 'typeorm';
import { Message } from './message.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
        private readonly mailerService: MailerService
    ) { }
    async getMessages(): Promise<Message[]> {
        return await this.messagesRepository.find({ relations: ['relation'] });
    }
    getMessage(id1: string,id2: string,skip: number, take: number): Promise<Message[]> {
        return this.messagesRepository.find({
            relations: ['userTwo'],
            where: [{ userOne: id1, userTwo: id2 },{ userOne: id2, userTwo: id1 }],
            skip: skip, take: take,
            order: { dateDeCreation: 'DESC' }
        });
    }
    getNbrMessage(id1: string,id2: string) {
      return this.messagesRepository.count({
          where: [{ userOne: id1, userTwo: id2 },{ userOne: id2, userTwo: id1 }]
      });
  }
    getNumberVueTotal(id1: string) {
      return this.messagesRepository.count({
          where: [{ userTwo: id1, vue: false }]
      });
  }
    getNumberVue(id1: string,id2: string) {
      return this.messagesRepository.count({
          where: [{ userOne: id2, userTwo: id1, vue: false }]
      });
  }
    getUserMessage(id1: string): Promise<any[]> {
        let object = [];
        let idOne = '';
        let idTwo = '';
      return  getRepository(Message)
      .createQueryBuilder("message")
      .innerJoinAndSelect("message.userTwo", "userTwo")
      .innerJoinAndSelect("message.userOne", "userOne")
      .addSelect("SUM(message.id)", "vue")
      .where("message.userOne.id = :ids", { ids: id1 })
      .orWhere("message.userTwo.id = :ids", { ids: id1 })
      
      .groupBy("message.userOne.id")
      .addGroupBy("message.userTwo.id")
      .orderBy("message.dateDeCreation", "DESC")
      .getRawMany().then(messages=>{
        return Promise.all(messages.map((message,index)=>{
            if (message.message_userOneId !== idTwo && message.message_userTwoId !== idOne ) {
                idOne = message.message_userOneId;
                idTwo = message.message_userTwoId;
                if (idOne == id1) {
                  return this.getNumberVue(idOne,idTwo).then(res => {
                    message.vue = res;
                    object.push(message)
                  })
                } else {
                  return this.getNumberVue(idTwo,idOne).then(res => {
                    message.vue = res;
                    object.push(message)
                  })
                }
             } 
          })).then(()=>{
            return Promise.resolve(object);  
        })
      })
  }
    createMessage(message: Message) {
        return this.messagesRepository.save(message);
    }
    updateMessage(message: Message) {
        return this.messagesRepository.save(message);
    }

    async deleteMessage(message: Message) {
        this.messagesRepository.delete(message);
    }

    sendEmail(name: string,objet:string,email:string,message:string){
        this.mailerService.sendMail({
        to: email, // list of receivers
        from: 'no-reply@formaconnect.com', // sender address
        subject: objet, // Subject line
        html: '<b>Bonjour '+name+',</b><br><p>'+message+'</p>', // HTML body content
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
    }
    sendEmailUpdatePassword(password: string,email:string,pseudo:string){
        this.mailerService.sendMail({
        to: email, // list of receivers
        from: 'no-reply@formaconnect.com', // sender address
        subject: "réinitialisation de votre mot de passe MINISTORIZ", // Subject line
        html: '<b>Bonjour '+pseudo+',</b><br><br><p>Identifiez-vous à votre comptre MINISTORIZ en utilisant le mot de passe provisoire :<br><b>'
        +password+
        '</b><br><br>Après vous être connecté avec ce mot de passe provisoire, vous devrez créer un nouveau mot de passe. </p>', // HTML body content
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
    }
  sendEmailAdmin(password: string, email: string, pseudo: string) {
  return  this.mailerService.sendMail({
      to: email, // list of receivers
      from: 'no-reply@formaconnect.com', // sender address
      subject: "Mot de passe Administrateurs MINISTORIZ", // Subject line
      html: '<b>Bonjour ' + pseudo + ',</b><br><br><p>Identifiez-vous à votre comptre Aministrateur MINISTORIZ en utilisant le mot de passe provisoire :<br><b>'
        + password 
      , // HTML body content
    })
      .then((success) => {
        return success
      })
      .catch((err) => {
        console.log(err)
      });
  }
    sendEmailActivation(lien: string,email:string,pseudo:string){
      console.log(lien)
      this.mailerService.sendMail({
      to: email, // list of receivers
      from: 'no-reply@formaconnect.com', // sender address
      subject: "activation de votre compte MINISTORIZ", // Subject line
      html: '<b>Bonjour '+pseudo+',</b><br><br><p>Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :<br><b><a href="http://'+lien+
      '">http://'+lien+
      '</a></b><br><br>Ceci est un mail automatique, Merci de ne pas y répondre. </p>', // HTML body content
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }
}
