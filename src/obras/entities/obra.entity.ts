import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity( 'obras' )
export class Obra {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id_obra: number;

  @Field()
  @Column()
  titulo: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  descripcion: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  estilo: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture: string;

  @Field( () => Artist )
  @ManyToOne( () => Artist, artist => artist.obras, { nullable: false } )
  @JoinColumn( { name: 'id_artista' } )
  artist: Artist;

  @Field( () => Galeria )
  @ManyToOne( () => Galeria, galeria => galeria.obras, { nullable: false } )
  @JoinColumn( { name: 'id_galeria' } )
  galeria: Galeria;

  @Field( () => Exposicion, { nullable: true } )
  @ManyToOne( () => Exposicion, exposicion => exposicion.obras, { nullable: true } )
  @JoinColumn( { name: 'id_exposicion' } )
  exposicion?: Exposicion;
}
