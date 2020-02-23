import { Injectable } from '@nestjs/common';
import { Histoire } from './histoire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoiresService {
    constructor(
        @InjectRepository(Histoire)
        private histoiresRepository: Repository<Histoire>,
    ) { }

    async getHistoires(): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin']});
    }
    async getNumberOfHistoires(number: number): Promise<Histoire[]> {
        return await this.histoiresRepository.find({ relations: ['userText', 'userDessin'], take: number });
    }
    async getHistoire(_id: number): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            select: ['userText', 'userDessin', 'noteDessinMoy', 'noteHistoireMoy', 'nombreVue', 'titreHistoire', 'lienIllustration'],
            where: [{ id: _id }],
        });
    }
    async createHistoire(user: Histoire) {
        this.histoiresRepository.save(user);
    }
    async updateHistoire(user: Histoire) {
        this.histoiresRepository.save(user);
    }

    async deleteHistoire(user: Histoire) {
        this.histoiresRepository.delete(user);
    }
}
