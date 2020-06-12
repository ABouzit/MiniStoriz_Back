import { PrimaryGeneratedColumn, Entity, ManyToOne, Column } from 'typeorm';
import { User } from 'src/users/user.entity';
@Entity()
export class Signaler {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => User)
    signaler: User;
    @ManyToOne(type => User)
    signaled: User;
    @Column({default: false})
    isActive: boolean;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    dateDeCreation: Date;
}
