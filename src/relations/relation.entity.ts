import { PrimaryGeneratedColumn, Entity, ManyToOne, Column } from 'typeorm';
import { User } from 'src/users/user.entity';
@Entity()
export class Relation {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @ManyToOne(type => User)
    userOne: User;
    @ManyToOne(type => User)
    userTwo: User;
    @Column({default: false})
    isActive: boolean;
}
