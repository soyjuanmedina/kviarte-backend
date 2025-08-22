import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Exposicion } from '../../exposiciones/entities/exposicion.entity';
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

  @Field( () => Artist, { nullable: true } )
  @ManyToOne( () => Artist, artist => artist.obras, { nullable: false } )
  artist: Artist;

  @Field( () => Exposicion, { nullable: true } )
  @ManyToOne( () => Exposicion, exposicion => exposicion.obras, { nullable: true } )
  exposicion: Exposicion;
}
