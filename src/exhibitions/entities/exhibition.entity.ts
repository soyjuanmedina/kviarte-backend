import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gallery } from '../../galleries/entities/gallery.entity';
import { Artwork } from '../../artworks/entities/artwork.entity';
import { Artist } from '../../artists/entities/artist.entity';

@ObjectType()
@Entity( { name: 'exhibitions' } )
export class Exhibition {
  @Field( () => Int, { name: 'id' } ) // lo expone como id en GraphQL
  @PrimaryGeneratedColumn()
  id_exhibition: number;

  @Field()
  @Column()
  title: string; // cambiado de 'titulo'

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  description?: string; // cambiado de 'descripcion'

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture?: string;

  @Field( () => Gallery )
  @ManyToOne( () => Gallery, gallery => gallery.exhibitions )
  @JoinColumn( { name: 'gallery_id' } ) // columna en inglés
  gallery: Gallery;

  @Field( () => Artist, { nullable: true } )
  @ManyToOne( () => Artist, artist => artist.exhibitions, { nullable: true } )
  @JoinColumn( { name: 'artist_id' } ) // columna en inglés
  artist?: Artist;

  @Field( () => [Artwork], { nullable: true } )
  @OneToMany( () => Artwork, artwork => artwork.exhibition )
  artworks?: Artwork[];
}
