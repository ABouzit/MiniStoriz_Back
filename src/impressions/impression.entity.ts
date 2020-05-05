import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Histoire } from 'src/histoires/histoire.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Impression {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => Histoire)
    histoire: Histoire;
    @ManyToOne(type => User)
    user: User;
    @Column({ length: 1000, nullable: true })
    commentaire: string;
    @Column({ type: 'float', nullable: true })
    noteHistoire: number;
    @Column({ type: 'float', nullable: true })
    noteDessin: number;
    @Column({ default: false })
    isActive: boolean;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    dateDeCreation: Date;
}
