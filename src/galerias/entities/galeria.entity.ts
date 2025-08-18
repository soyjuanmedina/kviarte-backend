import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
import { Artista } from '../../artistas/entities/artista.entity';

@Entity()
export class Galeria {
  @PrimaryGeneratedColumn()
  id_galeria: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  telefono?: string;

  @OneToMany(() => Exposicion, exposicion => exposicion.galeria)
  exposiciones: Exposicion[];

  @OneToMany(() => Artista, artista => artista.galeria)
  artistas: Artista[];
}
