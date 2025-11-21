import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistente } from './entities/asistente.entity';
import { Evento } from '../evento/entities/evento.entity';
import { CreateAsistenteDto } from './dto/create-asistente.dto';
@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepository: Repository<Asistente>,
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async registrarAsistente(
    eventoId: number,
    data: CreateAsistenteDto,
  ): Promise<Asistente> {
    const evento = await this.eventoRepository.findOne({
      where: { id: eventoId },
      relations: ['auditorio', 'asistentes'],
    });

    if (!evento) {
      throw new NotFoundException(
        `No se encontró evento con id ${eventoId}`,
      );
    }

    if (!evento.auditorio) {
      throw new BadRequestException(
        'El evento no tiene auditorio asignado, no se pueden registrar asistentes',
      );
    }
    const yaExiste = evento.asistentes?.some(
      (a) => a.email.toLowerCase() === data.email.toLowerCase(),
    );
    if (yaExiste) {
      throw new BadRequestException(
        'Ya existe un asistente con ese email en este evento',
      );
    }
    const capacidad = evento.auditorio.capacidad;
    const inscritos = evento.asistentes ? evento.asistentes.length : 0;

    if (inscritos >= capacidad) {
      throw new BadRequestException(
        'No se puede superar la capacidad del auditorio para este evento',
      );
    }
    const asistente = this.asistenteRepository.create({
      ...data,
      evento,
    });
    return this.asistenteRepository.save(asistente);
  }
  async findAsistentesByEvento(eventoId: number): Promise<Asistente[]> {
    const evento = await this.eventoRepository.findOne({
      where: { id: eventoId },
      relations: ['asistentes'],
    });
    if (!evento) {
      throw new NotFoundException(
        `No se encontró evento con id ${eventoId}`,
      );
    }
    return evento.asistentes ?? [];
  }
}
