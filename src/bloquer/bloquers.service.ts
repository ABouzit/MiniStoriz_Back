import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Bloquer } from './bloquer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BloquersService {
    constructor(
        @InjectRepository(Bloquer)
        private relationsRepository: Repository<Bloquer>,
        
    ) { }
    getBloquers(): Promise<Bloquer[]> {
        return  this.relationsRepository.find({ relations: ['bloquer', 'bloqued'] });
    }
     getBloquer(_id: string): Promise<Bloquer[]> {
        return  this.relationsRepository.find({
            relations: ['bloquer', 'bloqued'],
            select: ['bloquer', 'bloqued'],
            where: [{ id: _id }],
        });
    }
    getBloquerId(id: string, id2: string): Promise<Bloquer[]> {

        return this.relationsRepository.find({ relations: ['bloquer', 'bloqued'], where: [{ bloquer: id, bloqued: id2 }, { bloquer: id2, bloqued: id }] });
    }
     createBloquer(bloquer: Bloquer) {
       return this.relationsRepository.save(bloquer);
    }
    updateBloquer(bloquer: Bloquer): Promise<any> {
        return this.relationsRepository.save(bloquer);
    }

    deleteBloquer(id: string) {
        let relation = new Bloquer();
        relation.id = id;
        return this.relationsRepository.remove(relation);
    }
    deleteBloquerById(id1: string,id2: string) {
        return this.getBloquerId(id1,id2).then(res=>{

           return Promise.all(res.map((relation,index)=>{console.log(relation)
                 return this.relationsRepository.remove(relation);
            })).then(()=>{console.log("hna")
                return Promise.resolve('Bloqued Deleted');
            })
            
        })
    }
}
