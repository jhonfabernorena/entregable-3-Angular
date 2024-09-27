import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { barnyards } from '../../barnyards/entities/barnyard.entity';
                        

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    edad: number;

    @ManyToOne(() => barnyards, (barnyards) => barnyards.animales, { nullable: true })
    barnyards: barnyards;

    @ManyToMany(() => Animal, (animal) => animal.noCompatibles)
    @JoinTable()
    compatibles: Animal[];

    @ManyToMany(() => Animal, (animal) => animal.compatibles, { cascade: true })
    noCompatibles: Animal[];
}
