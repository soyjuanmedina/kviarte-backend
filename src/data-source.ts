import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Gallery } from './galleries/entities/gallery.entity';
import { User } from './users/entities/user.entity';
import { Exhibition } from './exhibitions/entities/exhibition.entity';
import { Artist } from './artists/entities/artist.entity';
import { Artwork } from './artworks/entities/artwork.entity';
import { Promotion } from './promotions/entities/promotion.entity';

config(); // carga .env

export const AppDataSource = new DataSource( {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: false, // siempre false para producción
  logging: true,
  entities: [User, Gallery, Artist, Exhibition, Artwork, Promotion],
  migrations: ['src/migrations/*.ts'],
} );
