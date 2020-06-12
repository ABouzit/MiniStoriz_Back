import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Signaler } from './signaler.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class SignalersService {
    constructor(
        @InjectRepository(Signaler)
        private relationsRepository: Repository<Signaler>,
        private userService: UsersService,

    ) { }
    getSignalers(): Promise<Signaler[]> {
        return this.relationsRepository.find({ relations: ['signaler', 'signaled'] });
    }
    getSignaler(_id: string): Promise<Signaler[]> {
        return  this.relationsRepository.find({
            relations: ['signaler', 'signaled'],
            select: ['signaler', 'signaled'],
            where: [{ id: _id }],
        });
    }
    getSignalerId(id: string, id2: string): Promise<Signaler[]> {

        return this.relationsRepository.find({ relations: ['signaler', 'signaled'], where: [{ signaler: id, signaled: id2 }] });
    }
    createSignaler(bloquer: Signaler) {
        return this.relationsRepository.save(bloquer).then(() => {
            return this.userService.getUser(bloquer.signaled.id).then((res) => {
                const signaled = res[0];
                signaled.nombreSignaler = signaled.nombreSignaler + 1;
                return this.userService.updateUser(signaled).then((user) => { console.log('////'); console.log(user); return Promise.resolve('Signaled Saved with success'); });
            });
        });
    }
    updateSignaler(bloquer: Signaler): Promise<any> {
        return this.relationsRepository.save(bloquer);
    }

    deleteSignaler(id: string) {
        const relation = new Signaler();
        relation.id = id;
        return this.relationsRepository.remove(relation);
    }
    deleteSignalerById(id1: string, id2: string) {
        return this.getSignalerId(id1, id2).then(res => {

           return Promise.all(res.map((relation, index) => {
            return this.relationsRepository.remove(relation).then(() => {
                     const signaled = relation.signaled;
                     signaled.nombreSignaler = signaled.nombreSignaler - 1;
                     return this.userService.updateUser(signaled).then(() => {
                    console.log('hna');
                    return Promise.resolve('Signaler Deleted');
                });
                 });
            }));

        });
    }
}
