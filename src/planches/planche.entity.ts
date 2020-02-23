import { Histoire } from 'src/histoires/histoire.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Planche {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @ManyToOne(type => Histoire)
    histoire: Histoire;
    @Column({ length: 100, nullable: true})
    lienDessin: string;
    @Column({ length: 1000, nullable: true })
    text: string;
    @Column({ default: false })
    isActive: boolean;
}
