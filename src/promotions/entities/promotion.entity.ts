import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Obra } from '../../obras/entities/obra.entity';

@ObjectType()
@Entity( 'promotions' )
export class Promotion {
  @Field( () => ID )
  @PrimaryGeneratedColumn( { name: 'id_oferta' } ) // en tu BBDD es id_oferta
  id: number;

  @Field()
  @Column( { unique: true } )
  code: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  description?: string;

  @Field( () => Float )
  @Column( 'decimal' )
  discount: number;

  @Field()
  @Column( { name: 'fecha_inicio', type: 'date' } )
  startDate: Date;

  @Field()
  @Column( { name: 'fecha_fin', type: 'date' } )
  endDate: Date;

  @Field( () => Galeria )
  @ManyToOne( () => Galeria, galeria => galeria.promotions, { onDelete: 'CASCADE' } )
  galeria: Galeria;

  @Field( () => [Obra], { nullable: true } )
  @ManyToMany( () => Obra, obra => obra.promotions, { cascade: true } )
  @JoinTable( {
    name: 'ofertas_obras', // tu tabla intermedia
    joinColumn: { name: 'id_oferta', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_obra', referencedColumnName: 'id_obra' }
  } )
  artworks?: Obra[];
}
