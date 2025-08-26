// src/exposiciones/entities/exposicion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';
import { Artist } from '../../artists/entities/artist.entity';

@ObjectType()
@Entity( { name: 'exposiciones' } )
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

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture: string;

  @Field( () => Galeria )
  @ManyToOne( () => Galeria, galeria => galeria.exposiciones )
  @JoinColumn( { name: 'id_galeria' } )
  galeria: Galeria;

  @Field( () => Artist, { nullable: true } )
  @ManyToOne( () => Artist, artist => artist.exposiciones, { nullable: true } )
  @JoinColumn( { name: 'id_artista' } )  // opcional, si quieres nombrar la columna explícitamente
  artist?: Artist;

  @Field( () => [Obra], { nullable: true } )
  @OneToMany( () => Obra, obra => obra.exposicion )
  obras?: Obra[];
}
