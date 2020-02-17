import { PrimaryGeneratedColumn, ManyToOne, Column, Entity } from 'typeorm';
import { Relation } from 'src/relations/relation.entity';
@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @ManyToOne(type => Relation)
    relation: Relation;
    @Column({ length: 1000})
    message: string;
    @Column()
    enyoeePar: envoyeePar;
    @Column({ default: false })
    vue: boolean;
}
