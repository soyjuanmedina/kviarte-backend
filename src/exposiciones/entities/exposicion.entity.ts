import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Artista } from '../../artistas/entities/artista.entity';

@ObjectType()
@Entity()
export class Exposicion {
  @Field( () => ID )
  @PrimaryGeneratedColumn()
  id_exposicion: number;

  @Field()
  @Column()
  titulo: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  descripcion?: string;

  @Field( { nullable: true } )
  @Column( { type: 'date', nullable: true } )
  fecha_inicio?: string;

  @Field( { nullable: true } )
  @Column( { type: 'date', nullable: true } )
  fecha_fin?: string;

  @ManyToOne( () => Galeria, galeria => galeria.id_galeria, { nullable: false } )
  galeria: Galeria;

  @ManyToOne( () => Artista, artista => artista.id_artista, { nullable: true } )
  artista: Artista;
}
