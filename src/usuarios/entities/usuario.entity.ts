import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@Entity( 'usuarios' )
@ObjectType()
@Entity()
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
}
