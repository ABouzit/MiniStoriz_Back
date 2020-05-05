import { PrimaryGeneratedColumn, ManyToOne, Column, Entity } from 'typeorm';
import { Relation } from 'src/relations/relation.entity';
import { User } from 'src/users/user.entity';
@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ length: 1000})
    message: string;
    @ManyToOne(type => User)
    userOne: User;
    @ManyToOne(type => User)
    userTwo: User;
    @Column({ default: false })
    vue: boolean;
    @Column({ length: 200, nullable: true })
    lienPhoto: string;
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    dateDeCreation: Date;
}
