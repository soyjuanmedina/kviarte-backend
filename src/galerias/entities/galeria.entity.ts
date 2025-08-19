// src/galerias/entities/galeria.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Artista } from '../../artistas/entities/artista.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';

@ObjectType()
@Entity()
export class Galeria {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id_galeria: number;

  @Field()
  @Column()
  nombre: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  direccion?: string;

  @Field( () => [Artista], { nullable: true } )
  @OneToMany( () => Artista, artista => artista.galeria )
  artistas?: Artista[];

  @Field( () => [Exposicion], { nullable: true } )
  @OneToMany( () => Exposicion, exposicion => exposicion.galeria )
  exposiciones?: Exposicion[];
}
