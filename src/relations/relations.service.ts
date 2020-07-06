import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Relation } from './relation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RelationsService {
  constructor(
    @InjectRepository(Relation)
    private relationsRepository: Repository<Relation>,
  ) {}
  getRelations(): Promise<Relation[]> {
    return this.relationsRepository.find({ relations: ['userOne', 'userTwo'] });
  }
  getRelation(_id: string): Promise<Relation[]> {
    return this.relationsRepository.find({
      relations: ['userOne', 'userTwo'],
      select: ['userOne', 'userTwo', 'isActive'],
      where: [{ id: _id }],
    });
  }
  getRelationByUsers(_id: string,_id2: string): Promise<Relation[]> {
    return this.relationsRepository.find({
      relations: ['userOne', 'userTwo'],
      select: ['userOne', 'userTwo', 'isActive', 'id'],
      where: [{userOne: _id2, userTwo: _id }, {userOne: _id, userTwo: _id2 }],
    });
  }
  getRelationRequest(id: string): Promise<Relation[]> {
    return this.relationsRepository.find({
      relations: ['userOne', 'userTwo'],

      where: [{ userTwo: id, isActive: false }],
    });
  }
  getRelationOfUser(id: string): Promise<Relation[]> {
    return this.relationsRepository.find({
      relations: ['userOne', 'userTwo'],

      where: [
        { userTwo: id, isActive: true },
        { userOne: id, isActive: true },
      ],
    });
  }
  getRelationRequestNbr(id: string) {
    return this.relationsRepository.count({
      relations: ['userOne', 'userTwo'],

      where: [{ userTwo: id, isActive: false, read: false }],
    });
  }
  getRelationId(id: string, id2: string) {
    return this.relationsRepository.count({
      where: [
        { userOne: id, userTwo: id2 },
        { userOne: id2, userTwo: id },
      ],
    });
  }
  getRelationType(id: string, id2: string) {
    let x = {ami: 0};
    return this.relationsRepository.count({
      where: [
        { userOne: id, userTwo: id2 },
        { userOne: id2, userTwo: id },
      ],
    }).then(res => {
      if (res > 0) {
        return this.getRelationIdAccepte(id,id2).then(resA => {
          if (resA > 0) {
            x.ami = 2;
            console.log(x)
            return Promise.resolve(x);
          } else {
            return this.getRelationEnv(id,id2).then(res1 => {
              if (res1 > 0) {
                x.ami = 1;
                console.log(x)
                return Promise.resolve(x);
              } else {
                x.ami = 3;
                console.log(x)
                return Promise.resolve(x);
              }
            })
          }
        })
        
      }else{
        console.log(x)
        return Promise.resolve(x);
      }
    })
  }
  getRelationEnv(id: string, id2: string) {
        
    return this.relationsRepository.count({where: [{userOne: id,userTwo: id2, isActive: false}]});
  }
  getRelationRec(id: string, id2: string) {
      
    return this.relationsRepository.count({where: [{userOne: id,userTwo: id2, isActive: false}]});
  }
  getRelationById(id: string, id2: string): Promise<Relation[]> {
    return this.relationsRepository.find({
      where: [
        { userOne: id, userTwo: id2 },
        { userOne: id2, userTwo: id },
      ],
    });
  }
  getRelationIdAccepte(id: string, id2: string) {
    return this.relationsRepository.count({
      where: [
        { userOne: id, userTwo: id2, isActive: true },
        { userOne: id2, userTwo: id, isActive: true },
      ],
    });
  }
  createRelation(relation: Relation) {
    return this.relationsRepository.save(relation);
  }
  updateRelation(relation: Relation): Promise<any> {
    return this.relationsRepository.save(relation);
  }

  deleteRelation(id: string) {
    let relation = new Relation();
    relation.id = id;
    return this.relationsRepository.remove(relation);
  }
  deleteRelationById(id1: string, id2: string) {
    return this.getRelationById(id1, id2).then(res => {
      console.log(res);
      res.map((relation, index) => {
        console.log(relation);
        return this.relationsRepository.remove(relation);
      });
    });
  }
}
