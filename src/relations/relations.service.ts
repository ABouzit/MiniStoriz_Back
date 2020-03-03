import { Injectable } from '@nestjs/common';
import { Relation } from './relation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RelationsService {
    constructor(
        @InjectRepository(Relation)
        private relationsRepository: Repository<Relation>,
    ) { }
    async getRelations(): Promise<Relation[]> {
        return await this.relationsRepository.find({ relations: ['userOne', 'userTwo'] });
    }
    async getRelation(_id: number): Promise<Relation[]> {
        return await this.relationsRepository.find({
            relations: ['userOne', 'userTwo'],
            select: ['userOne', 'userTwo', 'isActive'],
            where: [{ id: _id }],
        });
    }
    async createRelation(relation: Relation) {
        this.relationsRepository.save(relation);
    }
    async updateRelation(relation: Relation) {
        this.relationsRepository.save(relation);
    }

    async deleteRelation(relation: Relation) {
        this.relationsRepository.delete(relation);
    }
}
