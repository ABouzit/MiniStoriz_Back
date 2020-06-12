import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Contact } from './contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private relationsRepository: Repository<Contact>,

    ) { }
    getSignalers(): Promise<Contact[]> {
        return this.relationsRepository.find({
            order: { repondue: 'ASC' },
        });
    }
    countSignalers(): Promise<number> {
        return this.relationsRepository.count();
    }
    getSignaler(_id: string): Promise<Contact[]> {
        return  this.relationsRepository.find({
            where: [{ id: _id }],
        });
    }
    createSignaler(bloquer: Contact) {
        return this.relationsRepository.save(bloquer)
    }
    updateSignaler(bloquer: Contact): Promise<any> {
        return this.relationsRepository.save(bloquer);
    }

    deleteSignaler(id: string) {
        const relation = new Contact();
        relation.id = id;
        return this.relationsRepository.remove(relation);
    }
}
