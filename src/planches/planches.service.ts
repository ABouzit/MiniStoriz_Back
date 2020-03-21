import { Injectable } from '@nestjs/common';
import { Planche } from './planche.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanchesService {
    constructor(
        @InjectRepository(Planche)
        private planchesRepository: Repository<Planche>,
    ) { }

    getPlanches(): Promise<Planche[]> {
        return this.planchesRepository.find({ relations: ['histoire'] });
    }

    getPlanche(_id: number): Promise<Planche[]> {
        return this.planchesRepository.find({
            relations: ['histoire'],
            select: ['histoire', 'lienDessin', 'text'],
            where: [{ id: _id }],
        });
    }
    getPlancheByHistoire(_id: number): Promise<Planche[]> {
        return this.planchesRepository.find({
            relations: ['histoire'],
            select: ['histoire', 'lienDessin', 'text'],
            where: [{ histoire: _id }],
            order: {index: "ASC"}
        });
    }
    createPlanche(planche: Planche) {
        return this.planchesRepository.save(planche);
    }
    updatePlanche(planche: Planche) {
        this.planchesRepository.save(planche);
    }

    deletePlanche(planche: Planche) {
        this.planchesRepository.delete(planche);
    }
}
