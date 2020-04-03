import { User } from 'src/users/user.entity';
import { Column, PrimaryGeneratedColumn, ManyToMany, Entity, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
@Entity()
export class Histoire {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(type => User, { eager: true })
    @JoinColumn()
    userText: User;
    @ManyToOne(type => User, { eager: true })
    @JoinColumn()
    userDessin: User;
    @Column({ type: 'float', nullable: true })
    noteDessinMoy: number;
    @Column({ type: 'float', default: 0, nullable: true})
    noteHistoireMoy: number;
    @Column({ type: 'int', default: 0, nullable: true })
    nombreVue: number;
    @Column({ type: 'int', default: 0, nullable: true })
    nombreComment: number;
    @Column({ length: 30, nullable: true })
    titreHistoire: string;
    @Column({ length: 200, nullable: true })
    lienIllustration: string;
    @Column({ type: 'timestamp', nullable: true })
    dateDeCreation: Date;
}
