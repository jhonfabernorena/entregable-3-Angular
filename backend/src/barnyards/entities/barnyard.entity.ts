import { Animal } from 'src/animals/entities/animal.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class barnyards {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ type: 'int', nullable: false })
  capacidad: number; 

  @OneToMany(() => Animal, (animal) => animal.barnyards)
  animales: Animal[];
}
