import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
@Entity()
@Unique(['email'])
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
  @Column({ length: 40, nullable: true })
  pseudo: string;
  @Column({ name: 'email', length: 100 })
  email: string;
  @Column({ length: 25, nullable: true })
  ville: string;
  @Column({ length: 25, nullable: true })
  motDePasse: string;
  @Column({ type: 'int', nullable: true, default: 0 })
  nombreReseau: number;
  @Column({ type: 'int', nullable: true, default: 0 })
  nombreHistoire: number;
  @Column({ type: 'int', nullable: true, default: 0 })
  nombreDessin: number;
  @Column({ type: 'float', nullable: false, default: 0 })
  noteHistoire: number;
  @Column({ type: 'float', nullable: false, default: 0 })
  noteDessin: number;
  @Column({ default: false })
  isActive: boolean;
  @Column({ length: 255, default: 'USER' })
  role: role;
  @Column({ length: 30, nullable: true, default: 'EMAIL' })
  methode: string;
  @Column({ type: 'timestamp', nullable: true })
  dateDeCreation: Date;
  @Column({ type: 'timestamp', nullable: true })
  dateDernierConnexion: Date;
  @Column({ type: 'timestamp', nullable: true })
  dateDebloque: Date;
  @Column({ type: 'int', default: 0 })
  nombreSignaler: number;
  @Column({ default: false })
  demandeResignation: boolean;
  @Column({ default: false })
  demandeActivation: boolean;
  @Column({ default: false })
  isDesactive: boolean;
}
