import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
import { Artista } from '../../artistas/entities/artista.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Galeria {
  @Field( () => Int )
  @PrimaryGeneratedColumn( { name: 'id_galeria' } )
  id_galeria: number;

  @Field()
  @Column()
  nombre: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  email?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  telefono?: string;

  @Field( () => [Exposicion], { nullable: true } )
  @OneToMany( () => Exposicion, exposicion => exposicion.galeria )
  exposiciones: Exposicion[];

  @Field( () => [Artista], { nullable: true } )
  @OneToMany( () => Artista, artista => artista.galeria )
  artistas: Artista[];
}
