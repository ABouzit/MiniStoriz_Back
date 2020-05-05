import { PrimaryGeneratedColumn, Entity, ManyToOne, Column } from 'typeorm';
import { User } from 'src/users/user.entity';
@Entity()
export class Relation {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => User)
    userOne: User;
    @ManyToOne(type => User)
    userTwo: User;
    @Column({default: false})
    isActive: boolean;
    @Column({default: false})
    read: boolean;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    dateDeCreation: Date;
}
