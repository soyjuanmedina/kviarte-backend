import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Galeria } from './galerias/entities/galeria.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Exposicion } from './exposiciones/entities/exposicion.entity';
import { Artist } from './artists/entities/artist.entity';
import { Obra } from './obras/entities/obra.entity';
import { Oferta } from './ofertas/entities/oferta.entity';

config(); // carga .env

export const AppDataSource = new DataSource( {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: false, // siempre false para producción
  logging: true,
  entities: [Usuario, Galeria, Artist, Exposicion, Obra, Oferta],
  migrations: ['src/migrations/*.ts'],
} );
