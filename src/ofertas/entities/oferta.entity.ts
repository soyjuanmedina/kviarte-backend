import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';

@ObjectType()
@Entity( 'ofertas' )
export class Oferta {
  @Field( () => ID )
  @PrimaryGeneratedColumn()
  id_oferta: number;

  @Field( () => Float )
  @Column( 'decimal' )
  precio: number;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  descripcion?: string;

  @ManyToOne( () => Galeria, galeria => galeria.id_galeria )
  galeria: Galeria;

  @ManyToOne( () => Obra, obra => obra.id_obra )
  obra: Obra;

  @Field( { nullable: true } )
  @Column( { default: true } )
  activa: boolean;
}
