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
