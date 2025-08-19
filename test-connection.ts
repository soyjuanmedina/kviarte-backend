import { Socket } from 'net';

const host = 'aws-1-eu-central-1.pooler.supabase.com';
const port = 6543;

const socket = new Socket();
socket.setTimeout( 5000 ); // 5 segundos

socket.on( 'connect', () => {
  console.log( `✅ Conectado correctamente a ${host}:${port}` );
  socket.destroy();
} );

socket.on( 'timeout', () => {
  console.error( `⏱️ Timeout: no se pudo conectar a ${host}:${port}` );
  socket.destroy();
} );

socket.on( 'error', ( err ) => {
  console.error( `❌ Error conectando a ${host}:${port}:`, err.message );
} );

socket.connect( port, host );
