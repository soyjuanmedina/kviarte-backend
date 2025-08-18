import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Artista } from '../../artistas/entities/artista.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';

@ObjectType()
@Entity()
export class Obra {
  @Field( () => ID )
  @PrimaryGeneratedColumn()
  id_obra: number;

  @Field()
  @Column()
  titulo: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  descripcion?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  tecnica?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  ano?: string;

  @ManyToOne( () => Artista, artista => artista.obras )
  artista: Artista;

  @ManyToOne( () => Exposicion, exposicion => exposicion.id_exposicion, { nullable: true } )
  exposicion: Exposicion;
}
