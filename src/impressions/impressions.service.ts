import { Injectable } from '@nestjs/common';
import { Impression } from './impression.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImpressionsService {
        constructor(
            @InjectRepository(Impression)
            private impressionsRepository: Repository<Impression>,
        ) { }

    async getImpressions(): Promise<Impression[]> {
        return await this.impressionsRepository.find({ relations: ['histoire'] });
    }

    async getImpression(_id: number): Promise<Impression[]> {
        return await this.impressionsRepository.find({
            relations: ['histoire'],
            select: ['histoire', 'commentaire', 'noteHistoire', 'noteDessin'],
            where: [{ id: _id }],
        });
    }
    async createImpression(impression: Impression) {
        this.impressionsRepository.save(impression);
    }
    async updateImpression(impression: Impression) {
        this.impressionsRepository.save(impression);
    }

    async deleteImpression(impression: Impression) {
        this.impressionsRepository.delete(impression);
    }}
