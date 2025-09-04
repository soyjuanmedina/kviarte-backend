import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Galeria } from '../../galerias/entities/galeria.entity';

@Entity( 'usuarios' )
@ObjectType()
export class Usuario {
  @Field( () => Int, { name: 'id_usuario' } )
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column( { unique: true } )
  email: string;

  @Column()
  password_hash: string;

  @Field()
  @Column( { default: 'usuario' } )
  rol: string;

  // Relación con galerías (propietario)
  @Field( () => [Galeria], { nullable: true } )
  @OneToMany( () => Galeria, galeria => galeria.propietario )
  galerias?: Galeria[];
}
