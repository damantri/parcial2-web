import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { Ponente } from '../ponente/entities/ponente.entity';
import { Auditorio } from '../auditorio/entities/auditorio.entity';
import { CreateEventoDto } from './dto/create-evento.dto';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    @InjectRepository(Ponente)
    private readonly ponenteRepository: Repository<Ponente>,
    @InjectRepository(Auditorio)
    private readonly auditorioRepository: Repository<Auditorio>,
  ) {}

  async crearEvento(data: CreateEventoDto): Promise<Evento> {
    if (data.duracionHoras <= 0) {
      throw new BadRequestException('La duración debe ser positiva');
    }

    const ponente = await this.ponenteRepository.findOne({
      where: { id: data.ponenteId },
    });
    if (!ponente) {
      throw new NotFoundException(
        `No se encontró ponente con id ${data.ponenteId}`,
      );
    }

    let auditorio: Auditorio | null = null;
    if (data.auditorioId) {
      auditorio = await this.auditorioRepository.findOne({
        where: { id: data.auditorioId },
      });
      if (!auditorio) {
        throw new NotFoundException(
          `No se encontró auditorio con id ${data.auditorioId}`,
        );
      }
    }
    if (ponente.tipoPonente === 'Invitado' && data.descripcion.length < 50) {
      throw new BadRequestException(
        'Si el ponente es Invitado, la descripción debe tener al menos 50 caracteres',
      );
    }

    const evento = this.eventoRepository.create({
      titulo: data.titulo,
      descripcion: data.descripcion,
      fecha: data.fecha,
      duracionHoras: data.duracionHoras,
      estado: data.estado,
      ponente,
      auditorio: auditorio ?? null,
    });

    return this.eventoRepository.save(evento);
  }

  async aprobarEvento(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['auditorio'],
    });

    if (!evento) {
      throw new NotFoundException(`No se encontró evento con id ${id}`);
    }

    if (!evento.auditorio) {
      throw new BadRequestException(
        'No se puede aprobar un evento sin auditorio asignado',
      );
    }

    evento.estado = 'Aprobado';
    return this.eventoRepository.save(evento);
  }

  async eliminarEvento(id: number): Promise<void> {
    const evento = await this.eventoRepository.findOne({ where: { id } });

    if (!evento) {
      throw new NotFoundException(`No se encontró evento con id ${id}`);
    }

    if (evento.estado === 'Aprobado') {
      throw new ConflictException(
        'No se puede eliminar un evento que ya está aprobado',
      );
    }

    await this.eventoRepository.remove(evento);
  }

  async findEventoById(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['ponente', 'auditorio', 'asistentes'],
    });

    if (!evento) {
      throw new NotFoundException(`No se encontró evento con id ${id}`);
    }

    return evento;
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoRepository.find({
      relations: ['ponente', 'auditorio', 'asistentes'],
    });
  }
}
