import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ponente } from './entities/ponente.entity';
import { Evento } from '../evento/entities/evento.entity';
import { CreatePonenteDto } from './dto/create-ponente.dto';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(Ponente)
    private readonly ponenteRepository: Repository<Ponente>,
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async crearPonente(data: CreatePonenteDto): Promise<Ponente> {
    if (data.tipoPonente === 'Interno') {
      if (!data.email.endsWith('.edu')) {
        throw new BadRequestException(
          'Los ponentes internos deben tener un email que termine en .edu',
        );
      }
    } else if (data.tipoPonente === 'Invitado') {
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) {
        throw new BadRequestException(
          'Los ponentes invitados deben tener un email válido',
        );
      }
    } else {
      throw new BadRequestException(
        'tipoPonente debe ser "Interno" o "Invitado"',
      );
    }
    const ponente = this.ponenteRepository.create(data);
    return this.ponenteRepository.save(ponente);
  }

  async findPonenteById(id: number): Promise<Ponente> {
    const ponente = await this.ponenteRepository.findOne({ where: { id } });
    if (!ponente) {
      throw new NotFoundException(`No se encontró el ponente con id ${id}`);
    }
    return ponente;
  }
  async eliminarPonente(id: number): Promise<void> {
    const ponente = await this.findPonenteById(id);

    const eventosAsociados = await this.eventoRepository.count({
      where: { ponente: { id: ponente.id } },
    });

    if (eventosAsociados > 0) {
      throw new ConflictException(
        'No se puede eliminar el ponente porque tiene eventos asociados',
      );
    }
    await this.ponenteRepository.remove(ponente);
  }
}
