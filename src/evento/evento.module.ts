import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { Evento } from './entities/evento.entity';
import { Ponente } from '../ponente/entities/ponente.entity';
import { Auditorio } from '../auditorio/entities/auditorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Ponente, Auditorio])],
  controllers: [EventoController],
  providers: [EventoService],
  exports: [EventoService], 
})
export class EventoModule {}
