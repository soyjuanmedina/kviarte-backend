import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gallery } from '../../galleries/entities/gallery.entity';
import { Artwork } from '../../artworks/entities/artwork.entity';
import { Artist } from '../../artists/entities/artist.entity';

@ObjectType()
@Entity( { name: 'exhibitions' } )
export class Exhibition {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  description?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture?: string;

  @Field( () => Gallery, { nullable: true } )
  @ManyToOne( () => Gallery, gallery => gallery.exhibitions, { nullable: true } )
  @JoinColumn( { name: 'gallery_id' } )
  gallery?: Gallery;

  @Field( () => Artist, { nullable: true } )
  @ManyToOne( () => Artist, artist => artist.exhibitions, { nullable: true } )
  @JoinColumn( { name: 'artist_id' } )
  artist?: Artist;

  @Field( () => [Artwork], { nullable: true } )
  @OneToMany( () => Artwork, artwork => artwork.exhibition )
  artworks?: Artwork[];
}

