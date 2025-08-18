import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Oferta } from '../../ofertas/entities/oferta.entity';

@ObjectType()
@Entity()
export class Galeria {
  @Field( () => ID )
  @PrimaryGeneratedColumn()
  id_galeria: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  telefono: string;

  @OneToMany( () => Oferta, oferta => oferta.galeria )
  ofertas: Oferta[];
}
