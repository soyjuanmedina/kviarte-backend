import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';
import { Artista } from '../../artistas/entities/artista.entity';

@Entity()
export class Exposicion {
  @PrimaryGeneratedColumn()
  id_exposicion: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion?: string;

  @ManyToOne(() => Galeria, galeria => galeria.exposiciones)
  galeria: Galeria;

  @ManyToOne(() => Artista, artista => artista.exposiciones, { nullable: true })
  artista?: Artista;

  @OneToMany(() => Obra, obra => obra.exposicion)
  obras: Obra[];
}
