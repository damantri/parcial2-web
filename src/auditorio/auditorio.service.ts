import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditorio } from './entities/auditorio.entity';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';
@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(Auditorio)
    private readonly auditorioRepository: Repository<Auditorio>,
  ) {}

  async crearAuditorio(data: CreateAuditorioDto): Promise<Auditorio> {
    if (data.capacidad <= 0) {
      throw new BadRequestException(
        'La capacidad del auditorio debe ser mayor a cero',
      );
    }
    const auditorio = this.auditorioRepository.create(data);
    return this.auditorioRepository.save(auditorio);
  }
  async findAll(): Promise<Auditorio[]> {
    return this.auditorioRepository.find();
  }
  async findById(id: number): Promise<Auditorio> {
    const auditorio = await this.auditorioRepository.findOne({ where: { id } });
    if (!auditorio) {
      throw new BadRequestException(
        `No se encontró auditorio con id ${id}`,
      );
    }
    return auditorio;
  }
}
