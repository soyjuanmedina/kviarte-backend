// src/artistas/entities/artista.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Artista {
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

  @Field( () => Galeria, { nullable: true } )
  @ManyToOne( () => Galeria, galeria => galeria.artistas )
  galeria: Galeria;

  @Field( () => [Obra], { nullable: true } )
  @OneToMany( () => Obra, obra => obra.artista )
  obras: Obra[];

  @Field( () => [Exposicion], { nullable: true } )
  @OneToMany( () => Exposicion, exposicion => exposicion.artista )
  exposiciones: Exposicion[];
}
