import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ length: 200, nullable: true })
    lienPhoto: string;
    @Column({ length: 200, nullable: true })
    lienCouverture: string;
    @Column({ length: 25, nullable: true })
    prenom: string;
    @Column({ length: 25 })
    nom: string;
    @Column({ length: 25, nullable: true })
    pseudo: string;
    @Column({ length: 25 })
    email: string;
    @Column({ length: 25, nullable: true })
    ville: string;
    @Column({ length: 25 })
    motDePasse: string;
    @Column({ type: 'int', nullable: true, default: 0})
    nombreHistoire: number;
    @Column({ type: 'int', nullable: true, default: 0 })
    nombreDessin: number;
    @Column({ type: 'float', nullable: false, default: 0 })
    noteHistoire: number;
    @Column({ type: 'float', nullable: false, default: 0 })
    noteDessin: number;
    @Column({default: false})
    isActive: boolean;
    @Column()
    role: role;
    @Column({ type: 'datetime', nullable: true })
    dateDeCreation: Date;
    @Column({ type: 'datetime', nullable: true })
    dateDernierConnexion: Date;
}
