import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';

@ObjectType()
@Entity( 'promotions' )
export class Promotion {
  @Field( () => ID, { name: 'id_promotion' } )
  @PrimaryGeneratedColumn( { name: 'id_oferta' } )
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
  galeria: Galeria;

  @Field( () => [Obra], { nullable: true, name: 'obra' } )
  @ManyToMany( () => Obra, obra => obra.promotions, { cascade: true } )
  @JoinTable( {
    name: 'ofertas_obras',
    joinColumn: { name: 'id_oferta', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_obra', referencedColumnName: 'id_obra' }
  } )
  artworks?: Obra[];
}
