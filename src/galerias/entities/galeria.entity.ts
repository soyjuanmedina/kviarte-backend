import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity( 'galerias' )
export class Galeria {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id_galeria: number;

  @Field()
  @Column()
  nombre: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  descripcion?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  direccion?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  ciudad?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  web?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  telefono?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  email?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture?: string;

  @Field( () => [Obra], { nullable: true } )
  @OneToMany( () => Obra, obra => obra.galeria )
  obras?: Obra[];

  @Field( () => [Promotion], { nullable: true } )
  @OneToMany( () => Promotion, promotion => promotion.galeria )
  promotions?: Promotion[];
}
