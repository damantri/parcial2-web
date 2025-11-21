import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AsistenteService } from './asistente.service';
import { AsistenteController } from './asistente.controller';
import { Asistente } from './entities/asistente.entity';
import { Evento } from '../evento/entities/evento.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Asistente, Evento])],
  controllers: [AsistenteController],
  providers: [AsistenteService],
  exports: [AsistenteService], 
})
export class AsistenteModule {}
