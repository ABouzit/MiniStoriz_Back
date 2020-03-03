import { Injectable } from '@nestjs/common';
import { Impression } from './impression.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoiresService } from 'src/histoires/histoires.service';
import { LoggerService } from 'nest-logger';

@Injectable()
export class ImpressionsService {
  constructor(
    @InjectRepository(Impression)
    private impressionsRepository: Repository<Impression>,
    private histoiresService: HistoiresService,
  ) {}
  /* public logStuff() {
    this.logger.debug(
      `Found ${result.rowCount} items from db`,
      ImpressionsService.name,
    );
    this.logger.error(
      `Error while getting items from db`,
      err.stack,
      ImpressionsService.name,
    );
  }*/
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
  getHistoireNotes(_id: string): Promise<any> {
    let _noteMoyText = 0;
    let _noteMoyDessins = 0;
    return this.impressionsRepository
      .find({
        relations: ['histoire'],
        select: ['commentaire', 'noteHistoire', 'noteDessin'],
        where: [{ histoire: _id }],
      })
      .then(result => {
        result.map((imp, index) => {
          _noteMoyText += imp.noteHistoire;
          _noteMoyDessins += imp.noteDessin;
        });

        return Promise.resolve({
          noteMoyText: _noteMoyText,
          noteMoyDessins: _noteMoyDessins,
          index: result.length + 1,
        });
      });
  }
   createImpression(impression: Impression): Promise<Impression> {
    const histoire = impression.histoire;
    return this.getHistoireNotes(impression.histoire.id).then(notes => {
      histoire.noteDessinMoy =
        (notes.noteMoyDessins + impression.noteDessin) / notes.index;
      histoire.noteHistoireMoy =
        (notes.noteMoyText + impression.noteHistoire) / notes.index;
      return this.histoiresService.updateHistoire(histoire).then(() => {
        return this.impressionsRepository.save(impression).then(result => {
          return Promise.resolve(result);
        });
      });
    });
  }
  async updateImpression(impression: Impression) {
    await this.impressionsRepository.save(impression);
  }

  async deleteImpression(impression: Impression) {
    await this.impressionsRepository.delete(impression);
  }
}
