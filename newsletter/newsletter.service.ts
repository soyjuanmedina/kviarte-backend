import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class NewsletterService {
  constructor ( @InjectRepository( Subscription ) private repo: Repository<Subscription> ) { }

  findAll () {
    return this.repo.find();
  }

  subscribe ( email: string ) {
    const s = this.repo.create( { email } );
    return this.repo.save( s );
  }

  unsubscribe ( id: number ) {
    return this.repo.update( id, { activa: false } );
  }

  pruebaNewsletter () {
    // Endpoint de prueba para enviar newsletter (mock)
    return { mensaje: 'Newsletter de prueba enviada a todos los suscriptores activos.' };
  }
}
