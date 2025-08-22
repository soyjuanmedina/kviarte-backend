// src/usuarios/usuarios.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';

@Module( {
  imports: [TypeOrmModule.forFeature( [Usuario] )], // 👈 para que funcione el repo
  providers: [UsuariosService, UsuariosResolver],
  exports: [UsuariosService], // 👈 para poder usarlo en AuthModule u otros
} )
export class UsuariosModule { }
