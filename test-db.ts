import { Client } from 'pg';
import 'dotenv/config'; // ⬅️ Asegúrate de cargar .env

console.log( "DATABASE_URL =", process.env.DATABASE_URL ); // ✅ Aquí verificas la URL

const client = new Client( {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
} );

async function test () {
  try {
    await client.connect();
    console.log( 'Conexión exitosa a la DB!' );
  } catch ( err ) {
    console.error( 'Error conectando a la DB:', err );
  } finally {
    await client.end();
  }
}

test();
