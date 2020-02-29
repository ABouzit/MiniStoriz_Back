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

    async getPlanches(): Promise<Planche[]> {
        return await this.planchesRepository.find({ relations: ['histoire'] });
    }

    async getPlanche(_id: number): Promise<Planche[]> {
        return await this.planchesRepository.find({
            relations: ['histoire'],
            select: ['histoire', 'lienDessin', 'text'],
            where: [{ id: _id }],
        });
    }
    async getPlancheByHistoire(_id: number): Promise<Planche[]> {
        return await this.planchesRepository.find({
            relations: ['histoire'],
            select: ['histoire', 'lienDessin', 'text'],
            where: [{ histoire: _id }],
            order: {index: "ASC"}
        });
    }
    async createPlanche(planche: Planche) {
        this.planchesRepository.save(planche);
    }
    async updatePlanche(planche: Planche) {
        this.planchesRepository.save(planche);
    }

    async deletePlanche(planche: Planche) {
        this.planchesRepository.delete(planche);
    }
}
