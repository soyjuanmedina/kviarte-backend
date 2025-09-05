// src/artistas/entities/artista.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Gallery } from '../../galleries/entities/gallery.entity';
import { Artwork } from '../../artworks/entities/artwork.entity';
import { Exhibition } from '../../exhibitions/entities/exhibition.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity( 'artists' )   // <-- Antes era 'artistas'
export class Artist {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id: number;  // <-- Antes id_artista, ahora simplemente id

  @Field()
  @Column()
  name: string;   // <-- Antes nombre

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  biography?: string;   // <-- Antes biografia

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  style?: string;   // <-- Antes estilo

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture?: string;

  @Field( () => Gallery, { nullable: true } )
  @ManyToOne( () => Gallery, gallery => gallery.artists, {
    nullable: true,
    onDelete: 'SET NULL'
  } )
  @JoinColumn( { name: 'gallery_id' } )  // <-- Antes 'id_gallery'
  gallery?: Gallery;

  @Field( () => [Artwork], { nullable: true } )
  @OneToMany( () => Artwork, artwork => artwork.artist )
  artworks: Artwork[];

  @Field( () => [Exhibition], { nullable: true } )
  @OneToMany( () => Exhibition, exhibition => exhibition.artist )
  exhibitions: Exhibition[];
}

