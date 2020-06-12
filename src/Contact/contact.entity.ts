import { PrimaryGeneratedColumn, Entity, ManyToOne, Column } from 'typeorm';
@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ length: 40})
    pseudo: string;
    @Column({ name: 'email', length: 100 })
    email: string;
    @Column({ length: 200})
    objet: string;
    @Column({ length: 10000})
    message: string;
    @Column({default: false})
    repondue: boolean;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    dateDeCreation: Date;
}
