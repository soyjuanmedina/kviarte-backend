import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@ObjectType()
@Entity( 'galerias' )
export class Galeria {
  @Field( () => Int )
  @PrimaryGeneratedColumn( { name: 'id_galeria' } )
  id_galeria: number;

  @Field()
  @Column()
  nombre: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  email?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  telefono?: string;

  @Field( { nullable: true } )
  @Column( { type: 'text', nullable: true } )
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
  picture: string;

  @ManyToOne( () => Usuario, usuario => usuario.galerias, { nullable: false } )
  @JoinColumn( { name: 'usuario_id' } )
  propietario: Usuario;

  @Field( () => [Exposicion], { nullable: true } )
  @OneToMany( () => Exposicion, exposicion => exposicion.galeria )
  exposiciones: Exposicion[];

  @Field( () => [Artist], { nullable: true } )
  @OneToMany( () => Artist, artist => artist.galeria )
  artists: Artist[];
}

