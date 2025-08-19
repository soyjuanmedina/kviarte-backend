// src/exposiciones/entities/exposicion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';
import { Artista } from '../../artistas/entities/artista.entity';

@ObjectType()
@Entity()
export class Exposicion {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id_exposicion: number;

  @Field()
  @Column()
  titulo: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  descripcion?: string;

  @Field( () => Galeria )
  @ManyToOne( () => Galeria, galeria => galeria.exposiciones )
  galeria: Galeria;

  @Field( () => Artista, { nullable: true } )
  @ManyToOne( () => Artista, artista => artista.exposiciones, { nullable: true } )
  artista?: Artista;

  @Field( () => [Obra], { nullable: true } )
  @OneToMany( () => Obra, obra => obra.exposicion )
  obras?: Obra[];
}
