// src/promotions/entities/promotion.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Gallery } from '../../galleries/entities/gallery.entity';
import { Artwork } from '../../artworks/entities/artwork.entity';

@ObjectType()
@Entity( 'promotions' )
export class Promotion {
  @Field( () => ID, { name: 'id_promotion' } )
  @PrimaryGeneratedColumn( { name: 'id' } )
  id: number;

  @Field( () => Float )
  @Column( 'decimal' )
  discount: number;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  description?: string;

  @Field( { defaultValue: true } )
  @Column( { default: true } )
  active: boolean;

  @Field( () => Gallery )
  @ManyToOne( () => Gallery, gallery => gallery.promotions, { onDelete: 'CASCADE' } )
  @JoinColumn( { name: 'id_gallery' } )
  gallery: Gallery;

  @Field( () => [Artwork], { nullable: true } )
  @ManyToMany( () => Artwork, artwork => artwork.promotions, { cascade: true } )
  @JoinTable( {
    name: 'promotions_artworks',
    joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artwork_id', referencedColumnName: 'id_artwork' },
  } )
  artworks?: Artwork[];

  @Field( () => String, { nullable: true } )
  @Column( { unique: true, nullable: true } )
  code?: string;

  @Field( () => Date )
  @Column( { name: 'start_date', type: 'date' } )
  startDate: Date;

  @Field( () => Date )
  @Column( { name: 'end_date', type: 'date' } )
  endDate: Date;
}
