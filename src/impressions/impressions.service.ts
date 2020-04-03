import { Injectable } from '@nestjs/common';
import { Impression } from './impression.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoiresService } from 'src/histoires/histoires.service';
import { LoggerService } from 'nest-logger';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class ImpressionsService {
  constructor(
    @InjectRepository(Impression)
    private impressionsRepository: Repository<Impression>,
    private histoiresService: HistoiresService,
    private usersService: UsersService,
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
    return this.impressionsRepository.find({ relations: ['histoire','user'] });
  }

  getImpression(_id: number): Promise<Impression[]> {
    return this.impressionsRepository.find({
      relations: ['histoire','user'],
      select: ['commentaire', 'noteHistoire', 'noteDessin','user'],
      where: [{ id: _id }],
    });
  }
  getImpressionsHistoire(_id: string): Promise<Impression[]> {
    return this.impressionsRepository.find({
      relations: ['histoire', 'user'],
      where: [{ histoire: _id }], order: { dateDeCreation: 'DESC' }
    });
  }
  getImpressionsHistoirebyNumberAndSkip(number: number, nbr: number,_id: string): Promise<Impression[]> {
    return this.impressionsRepository.find({
      relations: ['histoire', 'user'],
      where: [{ histoire: _id }], skip: nbr, take: number, order: { dateDeCreation: 'DESC' }
    });
  }
  getImpressionsHistoireByNumber(number: number,_id: string): Promise<Impression[]> {
    return this.impressionsRepository.find({
      relations: ['histoire', 'user'],
      where: [{ histoire: _id }], take: number, order: { dateDeCreation: 'DESC' }
    });
  }
  getHistoireNotes(_id: string): Promise<any> {
    let _noteMoyText = 0;
    let _noteMoyDessins = 0;
    return this.impressionsRepository
      .find({
        relations: ['histoire','user'],
        select: ['commentaire', 'noteHistoire', 'noteDessin','user'],
        where: [{ histoire: _id }],
      })
      .then(result => {
        result.map((imp, index) => {
          _noteMoyText += imp.noteHistoire;
          _noteMoyDessins += imp.noteDessin;
        });

        return Promise.resolve({
          noteMoyText: _noteMoyText,
          noteMoyDessins: _noteMoyDessins,
          index: result.length + 1,
        });
      });
  }
   createImpression(imp: Impression): Promise<Impression> {
     let impression=imp;
    const histoire = impression.histoire;
    let userText= new User();
    let userDessin= new User();
    return this.getHistoireNotes(impression.histoire.id).then(notes => {
      histoire.noteDessinMoy =
        (notes.noteMoyDessins + impression.noteDessin) / notes.index;
      histoire.noteHistoireMoy =
        (notes.noteMoyText + impression.noteHistoire) / notes.index;
      return this.histoiresService.updateHistoire(histoire).then(() => {
        if (impression.histoire.userDessin.id == impression.histoire.userText.id) {
          return this.histoiresService.rateDessinByUser(impression.histoire.userDessin.id).then(res => {
            // res.data.noteHistoireMoy
            
            userDessin = impression.histoire.userDessin
                userDessin.noteDessin = res.noteDessinMoy
                console.log(res.noteDessinMoy)
            
            return this.usersService.updateUser(userDessin).then(us1 => {
              console.log(us1)
              return this.histoiresService.rateTextByUser(us1.id).then(res => {
                // res.data.noteHistoireMoy
                userText = us1
                userText.noteHistoire = res.noteHistoireMoy
                console.log(res.noteHistoireMoy)
                return this.usersService.updateUser(userText).then(us2=>{
                  console.log(us2)
                  return this.impressionsRepository.save(impression).then(result => {
                    return Promise.resolve(result);
                  });
                });
            });
          });
         });
        } else {
          return this.histoiresService.rateDessinByUser(impression.histoire.userDessin.id).then(res => {
            // res.data.noteHistoireMoy
            
            userDessin = impression.histoire.userDessin
                userDessin.noteDessin = res.noteDessinMoy
                console.log(res.noteDessinMoy)
            
            return this.usersService.updateUser(userDessin).then(us1 => {
              console.log(us1)
              return this.histoiresService.rateTextByUser(impression.histoire.userText.id).then(res => {
                // res.data.noteHistoireMoy
                userText = impression.histoire.userText
                userText.noteHistoire = res.noteHistoireMoy
                console.log(res.noteHistoireMoy)
                return this.usersService.updateUser(userText).then(us2=>{
                  console.log(us2)
                  return this.impressionsRepository.save(impression).then(result => {
                    return Promise.resolve(result);
                  });
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

  deleteImpression(impression: Impression) {
    this.impressionsRepository.delete(impression);
  }
}
