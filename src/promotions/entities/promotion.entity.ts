import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';

@ObjectType()
@Entity( 'promotions' )
export class Promotion {
  @Field( () => ID, { name: 'id_promotion' } )
  @PrimaryGeneratedColumn( { name: 'id' } ) // ya renombraste la columna en la BBDD
  id: number;

  @Field( () => Float, { name: 'precio' } )
  @Column( 'decimal' )
  discount: number;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  description?: string;

  @Field( { defaultValue: true } )
  @Column( { default: true } )
  activa: boolean;

  @Field( () => Galeria )
  @ManyToOne( () => Galeria, galeria => galeria.promotions, { onDelete: 'CASCADE' } )
  @JoinColumn( { name: 'id_galeria' } ) // indica explícitamente la columna FK
  galeria: Galeria;

  @Field( () => [Obra], { nullable: true, name: 'obra' } )
  @ManyToMany( () => Obra, obra => obra.promotions, { cascade: true } )
  @JoinTable( {
    name: 'promotions_artworks', // renombraste la tabla intermedia
    joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artwork_id', referencedColumnName: 'id_obra' },
  } )
  artworks?: Obra[];

  @Field( () => String, { nullable: true } )
  @Column( { unique: true, nullable: true } )
  code?: string;

  @Field( () => Date )
  @Column( { name: 'start_date', type: 'date' } )
  startDate: Date;

  @Field( () => Date )
  @Column( { name: 'end_date', type: 'date' } )
  endDate: Date;
}
