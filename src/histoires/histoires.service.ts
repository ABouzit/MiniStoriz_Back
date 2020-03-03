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
    async getHistoiresByNbrVue(): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
             order: {nombreVue: 'DESC'}, take: 3 });
    }
    async getHistoiresByPopulaire(): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],

             order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'}, take: 3 });
    }
    async getHistoiresPlusRecent(): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
             order: {dateDeCreation: 'DESC'}, take: 3 });
    }
    async getHistoiresPlusAncien(): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {dateDeCreation: 'ASC'}, take: 3 });
    }
    async getHistoiresByNbrVues(): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {nombreVue: 'DESC'} });
    }
    async getHistoiresByPopulaires(): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {noteHistoireMoy: 'DESC', noteDessinMoy: 'DESC'} });
    }
    async getHistoiresPlusRecents(): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {dateDeCreation: 'DESC'} });
    }
    async getHistoiresPlusAnciens(): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            order: {dateDeCreation: 'ASC'} });
    }
    async getNumberOfHistoires(number: number): Promise<Histoire[]> {
        return await this.histoiresRepository.find({ relations: ['userText', 'userDessin'], take: number, order: {dateDeCreation: 'DESC'} });
    }
    async getHistoire(_id: number): Promise<Histoire[]> {
        return await this.histoiresRepository.find({
            relations: ['userText', 'userDessin'],
            select: ['userText', 'userDessin', 'noteDessinMoy', 'noteHistoireMoy', 'nombreVue', 'titreHistoire', 'lienIllustration'],
            where: [{ id: _id }],
        });
    }
    async createHistoire(user: Histoire) {
      const histoire = user;
      histoire.dateDeCreation = new Date();
      return  this.histoiresRepository.save(histoire);
    }
    async updateHistoire(user: Histoire): Promise<Histoire> {
        console.log(user);
        return await this.histoiresRepository.save(user);
    }

    async deleteHistoire(user: Histoire) {
        this.histoiresRepository.delete(user);
    }
}
