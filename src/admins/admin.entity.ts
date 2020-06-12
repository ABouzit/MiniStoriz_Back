import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
@Entity()
@Unique(['email'])
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 40, nullable: true })
  pseudo: string;
  @Column({ name: 'email', length: 100 })
  email: string;
  @Column({ length: 25 })
  motDePasse: string;
  @Column({ length: 255, default: 'ADMIN' })
  role: role;
  @Column({ type: 'timestamp', nullable: true })
  dateDeCreation: Date;
  @Column({ type: 'timestamp', nullable: true })
  dateDernierConnexion: Date;
  @Column({ default: true })
  isActive: boolean;
}
