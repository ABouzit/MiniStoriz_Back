
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ length: 200, nullable: true})
    user: string;
    @Column({ length: 200, nullable: true})
    pseudo: string;
    @Column({ length: 200, nullable: true})
    lienDessin: string;
    @Column({ length: 10000, nullable: true })
    text: string;
    @Column({ length: 200, nullable: true})
    lien: string;
    @Column({ default: false })
    read: boolean;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    dateDeCreation: Date;
}
