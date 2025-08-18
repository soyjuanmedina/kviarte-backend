import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artista } from '../../artistas/entities/artista.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';

@Entity()
export class Obra {
  @PrimaryGeneratedColumn()
  id_obra: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  estilo: string;

  @ManyToOne(() => Artista, artista => artista.obras, { nullable: false })
  artista: Artista;

  @ManyToOne(() => Exposicion, exposicion => exposicion.obras, { nullable: true })
  exposicion: Exposicion;
}
