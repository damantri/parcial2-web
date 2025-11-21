import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PonenteModule } from './ponente/ponente.module';
import { EventoModule } from './evento/evento.module';
import { AuditorioModule } from './auditorio/auditorio.module';
import { AsistenteModule } from './asistente/asistente.module';

import { Ponente } from './ponente/entities/ponente.entity';
import { Evento } from './evento/entities/evento.entity';
import { Auditorio } from './auditorio/entities/auditorio.entity';
import { Asistente } from './asistente/entities/asistente.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',              
      database: 'parcial2.db',      
      entities: [Ponente, Evento, Auditorio, Asistente],
      synchronize: true,              
    }),
    PonenteModule,
    EventoModule,
    AuditorioModule,
    AsistenteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
