// src/promotions/entities/promotion.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, GraphQLISODateTime } from '@nestjs/graphql';
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
  @JoinColumn( { name: 'gallery_id' } )
  gallery: Gallery;

  @Field( () => [Artwork], { nullable: true } )
  @ManyToMany( () => Artwork, artwork => artwork.promotions, { cascade: true } )
  @JoinTable( {
    name: 'promotions_artworks',
    joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artwork_id', referencedColumnName: 'id' },
  } )
  artworks?: Artwork[];

  @Field( () => String, { nullable: true } )
  @Column( { unique: true, nullable: true } )
  code?: string;

  // Guardar fecha en la base de datos como string "YYYY-MM-DD", pero exponer como Date a GraphQL
  @Column( { name: 'start_date', type: 'date' } )
  private _startDate: string;

  @Field( () => GraphQLISODateTime )
  get startDate (): Date {
    return this._startDate ? new Date( this._startDate ) : null;
  }

  set startDate ( value: Date ) {
    this._startDate = value ? value.toISOString().split( 'T' )[0] : null;
  }

  @Column( { name: 'end_date', type: 'date' } )
  private _endDate: string;

  @Field( () => GraphQLISODateTime )
  get endDate (): Date {
    return this._endDate ? new Date( this._endDate ) : null;
  }

  set endDate ( value: Date ) {
    this._endDate = value ? value.toISOString().split( 'T' )[0] : null;
  }
}
