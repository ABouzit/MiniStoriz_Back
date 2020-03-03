import { User } from 'src/users/user.entity';
import { Column, PrimaryGeneratedColumn, ManyToMany, Entity, JoinTable, ManyToOne } from 'typeorm';
@Entity()
export class Histoire {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => User)
    userText: User;
    @ManyToOne(type => User)
    userDessin: User;
    @Column({ type: 'float', nullable: true })
    noteDessinMoy: number;
    @Column({ type: 'float', default: 0, nullable: true})
    noteHistoireMoy: number;
    @Column({ type: 'int', default: 0, nullable: true })
    nombreVue: number;
    @Column({ length: 30, nullable: true })
    titreHistoire: string;
    @Column({ length: 200, nullable: true })
    lienIllustration: string;
    @Column({ type: 'datetime', nullable: true })
    dateDeCreation: Date;
}
