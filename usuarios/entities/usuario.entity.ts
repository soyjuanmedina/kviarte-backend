import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Usuario {
  @Field( () => ID )
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
