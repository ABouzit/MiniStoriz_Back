import { PrimaryGeneratedColumn, Entity, ManyToOne, Column } from 'typeorm';
import { User } from 'src/users/user.entity';
@Entity()
export class Bloquer {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => User)
    bloquer: User;
    @ManyToOne(type => User)
    bloqued: User;
    @Column({default: false})
    isActive: boolean;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    dateDeCreation: Date;
}
