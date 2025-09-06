import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Artwork } from '../../artworks/entities/artwork.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Exhibition } from '../../exhibitions/entities/exhibition.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity( 'galleries' )
export class Gallery {
  @Field( () => Int )
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column( { default: 'Default name' } )
  name: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  description?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  address?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  city?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  website?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  phone?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  email?: string;

  @Field( { nullable: true } )
  @Column( { nullable: true } )
  picture?: string;

  // RELACIONES

  @Field( () => [Artwork], { nullable: true } )
  @OneToMany( () => Artwork, artwork => artwork.gallery )
  artworks?: Artwork[];

  @Field( () => [Promotion], { nullable: true } )
  @OneToMany( () => Promotion, promotion => promotion.gallery )
  promotions?: Promotion[];

  @Field( () => [Artist], { nullable: true } )
  @OneToMany( () => Artist, artist => artist.gallery )
  artists?: Artist[];

  @Field( () => [Exhibition], { nullable: true } )
  @OneToMany( () => Exhibition, exhibition => exhibition.gallery )
  exhibitions?: Exhibition[];

  @Field( () => User, { nullable: true } )
  @ManyToOne( () => User, user => user.galleries, { nullable: true } )
  @JoinColumn( { name: 'owner_id' } )
  owner?: User;
}
