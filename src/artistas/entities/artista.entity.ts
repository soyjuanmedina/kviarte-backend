// src/artistas/entities/artista.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';

@Entity()
export class Artista {
  @PrimaryGeneratedColumn()
  id_artista: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  biografia?: string;

  @Column({ nullable: true })
  estilo?: string;

  @ManyToOne(() => Galeria, galeria => galeria.artistas)
  galeria: Galeria;

  @OneToMany(() => Obra, obra => obra.artista)
  obras: Obra[];

  @OneToMany(() => Exposicion, exposicion => exposicion.artista)
  exposiciones: Exposicion[];
}
