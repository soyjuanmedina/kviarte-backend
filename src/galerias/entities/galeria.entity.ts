import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Obra } from '../../obras/entities/obra.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@ObjectType()
@Entity( 'galerias' )
export class Galeria {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id_galeria: number;

  @Field()
  @Column( { default: 'Nombre por defecto' } )
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

  // RELACIONES

  // Galería tiene muchas obras
  @Field( () => [Obra], { nullable: true } )
  @OneToMany( () => Obra, obra => obra.galeria )
  obras?: Obra[];

  // Galería tiene muchas promociones
  @Field( () => [Promotion], { nullable: true } )
  @OneToMany( () => Promotion, promotion => promotion.galeria )
  promotions?: Promotion[];

  // Galería tiene muchos artistas
  @Field( () => [Artist], { nullable: true } )
  @OneToMany( () => Artist, artist => artist.galeria )
  artists?: Artist[];

  // Galería tiene muchas exposiciones
  @Field( () => [Exposicion], { nullable: true } )
  @OneToMany( () => Exposicion, exposicion => exposicion.galeria )
  exposiciones?: Exposicion[];

  // Galería pertenece a un usuario (propietario)
  @Field( () => Usuario )
  @ManyToOne( () => Usuario, usuario => usuario.galerias )
  @JoinColumn( { name: 'usuario_id' } )
  propietario: Usuario;
}
