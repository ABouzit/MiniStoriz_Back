import { User } from 'src/users/user.entity';
import { Column, PrimaryGeneratedColumn, ManyToMany, Entity, JoinTable } from 'typeorm';
@Entity()
export class Histoire {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @ManyToMany(type => User)
    @JoinTable({ name: 'user_histoire' })
    users: User[];
    @Column({ type: 'int', nullable: true })
    noteDessinMoy: number;
    @Column({type: 'int', nullable: true})
    noteHistoireMoy: number;
    @Column({ type: 'int', nullable: true })
    nombreVue: number;
    @Column({ length: 30, nullable: true })
    titreHistoire: string;
    @Column({ length: 200, nullable: true })
    lienIllustration: string;

}
