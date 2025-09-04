import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
import { Galeria } from '../../galerias/entities/galeria.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

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
  descripcion?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  estilo?: string;

  @Field( () => Float, { nullable: true } )
  @Column( 'decimal', { nullable: true } )
  precio?: number;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture?: string;

  @Field( () => Artist )
  @ManyToOne( () => Artist, artist => artist.obras, { nullable: false } )
  @JoinColumn( { name: 'id_artista' } )
  artist: Artist;

  @Field( () => Galeria )
  @ManyToOne( () => Galeria, galeria => galeria.obras, { nullable: false, eager: true } )
  @JoinColumn( { name: 'id_galeria' } )
  galeria: Galeria;

  @Field( () => Exposicion, { nullable: true } )
  @ManyToOne( () => Exposicion, exposicion => exposicion.obras, { nullable: true } )
  @JoinColumn( { name: 'id_exposicion' } )
  exposicion?: Exposicion;

  @Field( () => [Promotion], { nullable: true } )
  @ManyToMany( () => Promotion, promotion => promotion.artworks )
  promotions?: Promotion[];
}
