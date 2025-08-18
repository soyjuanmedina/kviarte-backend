import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';

@ObjectType()
@Entity()
export class Artista {
  @Field( () => ID )
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

  @ManyToOne( () => Galeria, galeria => galeria.id_galeria, { nullable: true } )
  galeria: Galeria;

  @OneToMany( () => Obra, obra => obra.artista )
  obras: Obra[];
}
