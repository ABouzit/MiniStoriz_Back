import { Histoire } from 'src/histoires/histoire.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Planche {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => Histoire)
    histoire: Histoire;
    @Column({ length: 100, nullable: true})
    lienDessin: string;
    @Column({ length: 10000, nullable: true })
    text: string;
    @Column()
    index: number;
    @Column({ default: false })
    isActive: boolean;
}
