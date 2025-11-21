import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PonenteService } from './ponente.service';
import { PonenteController } from './ponente.controller';
import { Ponente } from './entities/ponente.entity';
import { Evento } from '../evento/entities/evento.entity'; 
@Module({
  imports: [TypeOrmModule.forFeature([Ponente, Evento])],
  controllers: [PonenteController],
  providers: [PonenteService],
  exports: [PonenteService], 
})
export class PonenteModule {}
