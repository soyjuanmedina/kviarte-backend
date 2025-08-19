import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exposicion } from './entities/exposicion.entity';
import { Galeria } from '../galerias/entities/galeria.entity';
import { Artista } from '../artistas/entities/artista.entity';
import { CreateExposicionInput } from './dto/create-exposicion.input';

@Injectable()
export class ExposicionesService {
  constructor (
    @InjectRepository( Exposicion )
    private readonly exposicionRepo: Repository<Exposicion>,

    @InjectRepository( Galeria )
    private readonly galeriaRepo: Repository<Galeria>,

    @InjectRepository( Artista )
    private readonly artistaRepo: Repository<Artista>,
  ) { }

  async findAll (): Promise<Exposicion[]> {
    return this.exposicionRepo.find( {
      relations: ['galeria', 'artista', 'obras'],
    } );
  }

  async findOne ( id: number ): Promise<Exposicion> {
    return this.exposicionRepo.findOne( {
      where: { id_exposicion: id },
      relations: ['galeria', 'artista', 'obras'],
    } );
  }

  async create ( input: CreateExposicionInput ): Promise<Exposicion> {
    // 1️⃣ Depuración: muestra lo que estás recibiendo
    console.log( 'Buscando galería con id_galeria =', input.id_galeria );

    // 2️⃣ Convierte input.id_galeria a número por si viene como string
    const idGaleria = Number( input.id_galeria );

    // 3️⃣ Buscar la galería en la base de datos
    const galeria = await this.galeriaRepo.findOne( {
      where: { id_galeria: idGaleria }, // <-- asegúrate que la columna se llame 'id_galeria'
    } );

    // 4️⃣ Depuración: muestra el resultado de la búsqueda
    console.log( 'Resultado de la búsqueda de galería:', galeria );

    // 5️⃣ Si no existe, lanza el error
    if ( !galeria ) {
      throw new Error( 'Galería no encontrada' );
    }

    // 6️⃣ Crear la exposición
    const exposicion = this.exposicionRepo.create( {
      titulo: input.titulo,
      descripcion: input.descripcion,
      galeria: galeria, // asociar la galería encontrada
    } );

    // 7️⃣ Guardar en la base de datos
    return await this.exposicionRepo.save( exposicion );
  }


  if (!galeria ) throw new Error( 'Galería no encontrada' );

let artista: Artista = null;
if ( input.id_artista ) {
  artista = await this.artistaRepo.findOne( {
    where: { id_artista: input.id_artista },
  } );
  if ( !artista ) throw new Error( 'Artista no encontrado' );
}

const exposicion = this.exposicionRepo.create( {
  titulo: input.titulo,
  descripcion: input.descripcion,
  galeria,
  artista,
} );

return this.exposicionRepo.save( exposicion );
  }
}
