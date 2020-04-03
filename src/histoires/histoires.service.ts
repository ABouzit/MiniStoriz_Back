import { Injectable } from '@nestjs/common';
import { Histoire } from './histoire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class HistoiresService {
    constructor(
        @InjectRepository(Histoire)
        private histoiresRepository: Repository<Histoire>,
        private usersService: UsersService,
    ) { }

    getHistoires(): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin']});
    }
    getHistoiresByNbrVue(): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
             order: {nombreVue: 'DESC'}, take: 3 });
    }
    getHistoiresByPopulaire(): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'}, take: 3 });
    }
    getHistoiresPlusRecent(): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
             order: {dateDeCreation: 'DESC'}, take: 3 });
    }
    getHistoiresPlusAncien(): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {dateDeCreation: 'ASC'}, take: 3 });
    }
    getHistoiresByNbrVues(): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {nombreVue: 'DESC'} });
    }
    getHistoiresByPopulaires(): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'} });
    }
    getHistoiresPlusRecents(): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {dateDeCreation: 'DESC'} });
    }
    getHistoiresPlusAnciens(): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {dateDeCreation: 'ASC'} });
    }

    getNumberOfHistoiresSearchByUser(number: number, nbr: number, filtre: number, search:string, id:string): Promise<Histoire[]> {
        if (filtre == 1) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], where: {userText: id}, skip: nbr, take: number, order: {nombreVue: 'DESC'},});
            } else {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                    where: [{ userText: id, titreHistoire: Like('%'+search+'%')}], skip: nbr, take: number, order: {nombreVue: 'DESC'}});
                    
            }
        } else if(filtre == 2) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], where: {userText: id}, skip: nbr, take: number, order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'} });
            } else {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                    where: [{ userText: id,titreHistoire: Like('%'+search+'%')}], skip: nbr, take: number, order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'}});
                    
            }
        } else if(filtre == 3) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], where: {userText: id}, skip: nbr, take: number, order: {dateDeCreation: 'DESC'} });
            } else {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                    where: [{ userText: id,titreHistoire: Like('%'+search+'%')}], skip: nbr, take: number, order: {dateDeCreation: 'DESC'}});
                
            }
        } else if(filtre == 4) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], where: {userText: id}, skip: nbr, take: number, order: {dateDeCreation: 'ASC'} });
            } else {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                    where: [{ userText: id,titreHistoire: Like('%'+search+'%')}], skip: nbr, take: number, order: {dateDeCreation: 'ASC'}});
                   
            }
        }
    }

    getNumberOfHistoires(number: number, nbr: number, filtre: number, search:string): Promise<Histoire[]> {
        if (filtre == 1) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], skip: nbr, take: number, order: {nombreVue: 'DESC'},});
            } else {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                    where: [{ titreHistoire: Like('%'+search+'%')}], skip: nbr, take: number, order: {nombreVue: 'DESC'}});
                    
            }
        } else if(filtre == 2) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], skip: nbr, take: number, order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'} });
            } else {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                    where: [{ titreHistoire: Like('%'+search+'%')}], skip: nbr, take: number, order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'}});
                    
            }
        } else if(filtre == 3) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], skip: nbr, take: number, order: {dateDeCreation: 'DESC'} });
            } else {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                    where: [{ titreHistoire: Like('%'+search+'%')}], skip: nbr, take: number, order: {dateDeCreation: 'DESC'}});
                
            }
        } else if(filtre == 4) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], skip: nbr, take: number, order: {dateDeCreation: 'ASC'} });
            } else {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                    where: [{ titreHistoire: Like('%'+search+'%')}], skip: nbr, take: number, order: {dateDeCreation: 'ASC'}});
                   
            }
        }
    }
    getNumberOfHistoiresUsers(number: number, nbr: number, filtre: number, search:string): Promise<Histoire[]> {
        if (filtre == 1) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], skip: nbr, take: number, order: {nombreVue: 'DESC'},});
            } else {
                
                return this.usersService.getUsersSearch(search).then(result => {
                        return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                            where: [{ userText: In(result)}], skip: nbr, take: number, order: {nombreVue: 'DESC'}});
                    
                  });
            }
        } else if(filtre == 2) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], skip: nbr, take: number, order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'} });
            } else {
                return this.usersService.getUsersSearch(search).then(result => {
                        return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                            where: [{ userText: In(result)}], skip: nbr, take: number, order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'}});
                  
                  });
            }
        } else if(filtre == 3) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], skip: nbr, take: number, order: {dateDeCreation: 'DESC'} });
            } else {
                return this.usersService.getUsersSearch(search).then(result => {
                        return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                            where: [{ userText: In(result)}], skip: nbr, take: number, order: {dateDeCreation: 'DESC'}});
                    
                  });
            }
        } else if(filtre == 4) {
            if (search == "xxxx") {
                return this.histoiresRepository.find({ relations: ['userText', 'userDessin'], skip: nbr, take: number, order: {dateDeCreation: 'ASC'} });
            } else {
                return this.usersService.getUsersSearch(search).then(result => {
                        return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
                            where: [{ userText: In(result)}], skip: nbr, take: number, order: {dateDeCreation: 'ASC'}});
                   
                  });
            }
        }
    }
    getHistoire(_id: number): Promise<Histoire[]> {
        return this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            where: [{ id: _id }],
        });
    }
    createHistoire(user: Histoire) {
      const histoire = user;
      histoire.dateDeCreation = new Date();
      return  this.histoiresRepository.save(histoire);
    }
    updateHistoire(user: Histoire): Promise<Histoire> {
        
        return this.histoiresRepository.save(user);
    }

    deleteHistoire(user: Histoire) {
        this.histoiresRepository.delete(user);
    }

    numberHistoire() {
       return this.histoiresRepository.count();
    }

    numberHistoireByUser(id:string) {
        return this.histoiresRepository.count({  relations: ['userText', 'userDessin'],where: [{ userText: id }] });
     }

    numberHistoireSearch(search: string) {
        return this.histoiresRepository.count({ titreHistoire: Like('%'+search+'%') });
     }

    numberHistoireSearchByUser(search: string, id:string) {
    return this.histoiresRepository.count({  relations: ['userText', 'userDessin'],where: [{ userText: id ,titreHistoire: Like('%'+search+'%') }] });
    }
    
    numberHistoireSearchUsers(search: string) {
        return this.usersService.getUsersSearch(search).then(result => {
            return this.histoiresRepository.count({ relations: ['userText', 'userDessin'],
                where: [{ userText: In(result)}]});
        });
    }
    numberHistoireTextUsers(id: string) {
            return this.histoiresRepository.count({ relations: ['userText', 'userDessin'],
                where: [{ userText: id}]});
    }
    numberHistoireDessinUsers(id: string) {
        return this.histoiresRepository.count({ relations: ['userText', 'userDessin'],
            where: [{ userDessin: id}]});
    }
    rateDessinByUser(id: string): Promise<any>{
        let _noteMoyDessins = 0;
        let _index = 0;
        return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
            select: ['noteDessinMoy'],
            where: [{ userDessin: id}]}).then(res => {
                return Promise.all(res.map((histoire, index) =>{
                    // if (histoire.noteDessinMoy > 0) {
                        _noteMoyDessins += histoire.noteDessinMoy;
                        _index = _index + 1;
                    // }
                    
                })).then(()=> {
                    return Promise.resolve({
                        noteDessinMoy: _noteMoyDessins / _index
                        });  
                })
              
            });
    }
    rateTextByUser(id: string): Promise<any>{
        let _noteHistoireMoy = 0;
        let _index = 0;
        return this.histoiresRepository.find({ relations: ['userText', 'userDessin'],
            select: ['noteHistoireMoy'],
            where: [{ userText: id}]}).then(res => {
                return Promise.all(res.map((histoire, index) =>{
                    if (histoire.noteHistoireMoy > 0) {
                       _noteHistoireMoy += histoire.noteHistoireMoy;
                       _index = _index + 1;
                    }
                })).then(()=>{
                    return Promise.resolve({
                        noteHistoireMoy: _noteHistoireMoy / _index
                        }); 
                })
               
            });
    }
}
