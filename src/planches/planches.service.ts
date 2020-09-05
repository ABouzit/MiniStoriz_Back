import { Injectable } from '@nestjs/common';
import { Planche } from './planche.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Histoire } from 'src/histoires/histoire.entity';

@Injectable()
export class PlanchesService {
    constructor(
        @InjectRepository(Planche)
        private planchesRepository: Repository<Planche>,
    ) { }

    getPlanches(): Promise<Planche[]> {
        return this.planchesRepository.find({ relations: ['histoire'] });
    }

    getPlanche(_id: string): Promise<Planche[]> {
        return this.planchesRepository.find({
            relations: ['histoire'],
            select: ['histoire', 'lienDessin', 'text'],
            where: [{ id: _id }],
        });
    }
    getPlancheByHistoire(_id: string): Promise<Planche[]> {
        return this.planchesRepository.find({
            relations: ['histoire'],
            select: ['index', 'lienDessin', 'text'],
            where: [{ histoire: _id }],
            order: {index: "ASC"}
        });
    }
    getPlancheByHistoireId(_id: number): Promise<any[]> {
        let object = [{text: "", img: "", data: "", lien: ""}]
        return this.planchesRepository.find({
            select: ['index', 'lienDessin', 'text'],
            where: [{ histoire: _id }],
            order: {index: "ASC"}
        }).then(planches=>{
            return Promise.all(planches.map((planche,index)=>{
              object.push({text: planche.text, img: "", data: "", lien: planche.lienDessin})
              
            })).then(()=>{
              return Promise.resolve(object);  
            })
          });
    }
    createPlanche(planche: Planche) {
        return this.planchesRepository.save(planche);
    }
    updatePlanche(planche: Planche): Promise<any> {
        let pl;
        return this.planchesRepository.find({histoire: planche.histoire, index: planche.index}).then(planches=>{
            if (planches.length > 0) {
                pl = planches[0];
                pl.lienDessin = planche.lienDessin;
                pl.text = planche.text;
                return this.planchesRepository.save(pl);
            } else {
                return this.planchesRepository.save(planche);
            }
        })
        
    }

    deletePlanche(planche: Planche) {
        return this.planchesRepository.delete(planche);
    }
    deletePlancheByHistoire(histoire: Histoire) {
        return this.planchesRepository.find({histoire: histoire}).then(planches=>{
            return Promise.all(
                planches.map(planche => {
                    return this.planchesRepository.delete(planche);
                })
            )
        })
    }
    updatePlancheByHistoire(histoire: Histoire, histoire2: Histoire) {
        return this.planchesRepository.find({histoire: histoire}).then(planches=>{
            return Promise.all(
                planches.map(planche => {
                    let pl = new Planche();
                    pl = planche;
                    pl.histoire = histoire2;
                    return this.planchesRepository.save(pl);
                })
            )
        })
    }
}
