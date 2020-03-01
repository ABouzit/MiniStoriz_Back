import { Injectable } from '@nestjs/common';
import { Impression } from './impression.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoiresService } from 'src/histoires/histoires.service';

@Injectable()
export class ImpressionsService {
        constructor(
            @InjectRepository(Impression)
            private impressionsRepository: Repository<Impression>, private histoiresService: HistoiresService,
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
    async getImpressionsHistoire(_id: string): Promise<Impression[]> {
        return await this.impressionsRepository.find({
            relations: ['histoire'],
            select: ['commentaire', 'noteHistoire', 'noteDessin'],
            where: [{ histoire: _id }],
        });
    }
    async getHistoireNotes(_id: string): Promise<any> {
        let _noteMoyText = 0;
        let _noteMoyDessins = 0;
        return await this.impressionsRepository.find({
            relations: ['histoire'],
            select: ['commentaire', 'noteHistoire', 'noteDessin'],
            where: [{ histoire: _id }],
        }).then(async (result) => {
            await result.map((imp, index) => {
                _noteMoyText += imp.noteHistoire;
                _noteMoyDessins += imp.noteDessin;

            });
            return {
                noteMoyText: _noteMoyText,
                noteMoyDessins: _noteMoyDessins,
                index: result.length + 1,
            };
        });
    }
    async createImpression(impression: Impression) {

        const histoire = impression.histoire;
        this.getHistoireNotes(impression.histoire.id).then((notes) => {
            histoire.noteDessinMoy = (notes.noteMoyDessins + impression.noteDessin) / notes.index;
            histoire.noteHistoireMoy = (notes.noteMoyText + impression.noteHistoire) / notes.index;
            console.log(histoire);
            this.histoiresService.updateHistoire(histoire);
            this.impressionsRepository.save(impression);
        });
    }
    async updateImpression(impression: Impression) {
        this.impressionsRepository.save(impression);
    }

    async deleteImpression(impression: Impression) {
        this.impressionsRepository.delete(impression);
    }}
