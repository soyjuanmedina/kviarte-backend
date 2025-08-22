import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artista } from '../../artists/entities/artista.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Obra {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id_obra: number;

  @Field()
  @Column()
  titulo: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  descripcion: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  estilo: string;

  @Field( () => Artista, { nullable: true } )
  @ManyToOne( () => Artista, artista => artista.obras, { nullable: false } )
  artista: Artista;

  @Field( () => Exposicion, { nullable: true } )
  @ManyToOne( () => Exposicion, exposicion => exposicion.obras, { nullable: true } )
  exposicion: Exposicion;
}
