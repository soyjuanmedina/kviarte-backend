import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Exhibition } from '../../exhibitions/entities/exhibition.entity';
import { Gallery } from '../../galleries/entities/gallery.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity( 'artworks' )
export class Artwork {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id: number; // antes id_artwork

  @Field()
  @Column()
  title: string; // antes titulo

  @Field( { nullable: true } )
  @Column( { nullable: true, type: 'text' } )
  description?: string; // antes descripcion

  @Field( () => Float, { nullable: true } )
  @Column( 'numeric', { nullable: true } )
  price?: number; // antes precio

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  style?: string; // antes estilo

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture?: string;

  @Field( { defaultValue: true } )
  @Column( { default: true } )
  available: boolean;

  @Field( () => Artist )
  @ManyToOne( () => Artist, ( artist ) => artist.artworks, { nullable: false } )
  @JoinColumn( { name: 'artist_id' } ) // antes id_artista
  artist: Artist;

  @Field( () => Gallery )
  @ManyToOne( () => Gallery, ( gallery ) => gallery.artworks, {
    nullable: false,
    eager: true,
  } )
  @JoinColumn( { name: 'gallery_id' } ) // antes id_gallery
  gallery: Gallery;

  @Field( () => Exhibition, { nullable: true } )
  @ManyToOne( () => Exhibition, ( exhibition ) => exhibition.artworks, {
    nullable: true,
  } )
  @JoinColumn( { name: 'exhibition_id' } ) // antes id_exhibition
  exhibition?: Exhibition;

  @Field( () => [Promotion], { nullable: true } )
  @ManyToMany( () => Promotion, ( promotion ) => promotion.artworks )
  @JoinTable( {
    name: 'promotions_artworks',
    joinColumn: { name: 'artwork_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
  } )
  promotions?: Promotion[];
}
