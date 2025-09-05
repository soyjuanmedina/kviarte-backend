import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gallery } from '../../galleries/entities/gallery.entity';

@Entity( 'users' )
@ObjectType()
export class User {
  @Field( () => Int, { name: 'id_user' } )
  @PrimaryGeneratedColumn( { name: 'id' } )
  id_user: number;

  @Field()
  @Column( { name: 'name' } )
  nombre: string;

  @Field()
  @Column( { unique: true } )
  email: string;

  @Column( { name: 'password' } )
  password_hash: string;

  @Field()
  @Column( { name: 'role', default: 'USER' } )
  rol: 'ADMIN' | 'GALLERY' | 'USER' | 'ARTIST';

  @Field( () => String )
  @CreateDateColumn( { name: 'registration_date' } )
  registrationDate: String;

  // Relación con galerías (propietario)
  @Field( () => [Gallery], { nullable: true } )
  @OneToMany( () => Gallery, gallery => gallery.owner )
  galleries?: Gallery[];
}
