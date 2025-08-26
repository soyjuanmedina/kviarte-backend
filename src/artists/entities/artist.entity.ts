// src/artistas/entities/artista.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity( 'artistas' )
export class Artist {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id_artista: number;

  @Field()
  @Column()
  nombre: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  biografia?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  estilo?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture: string;

  @Field( () => Galeria, { nullable: true } )
  @ManyToOne( () => Galeria, galeria => galeria.artists, {
    nullable: true,     // permite null en la DB
    onDelete: 'SET NULL' // si se borra la galería, se limpia el campo
  } )
  @JoinColumn( { name: 'id_galeria' } )
  galeria?: Galeria;

  @Field( () => [Obra], { nullable: true } )
  @OneToMany( () => Obra, obra => obra.artist )
  obras: Obra[];

  @Field( () => [Exposicion], { nullable: true } )
  @OneToMany( () => Exposicion, exposicion => exposicion.artist )
  exposiciones: Exposicion[];
}
