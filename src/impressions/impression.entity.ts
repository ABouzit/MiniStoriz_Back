import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Histoire } from 'src/histoires/histoire.entity';

@Entity()
export class Impression {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @ManyToOne(type => Histoire)
    histoire: Histoire;
    @Column({ length: 1000, nullable: true })
    commentaire: string;
    @Column({ type: 'float', nullable: true   })
    noteHistoire: number;
    @Column({ type: 'float', nullable: true })
    noteDessin: number;
    @Column({ default: false })
    isActive: boolean;
}
