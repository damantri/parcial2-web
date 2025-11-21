import { EstadoEvento } from '../entities/evento.entity';

export class CreateEventoDto {
  titulo: string;
  descripcion: string;
  fecha: Date;
  duracionHoras: number;
  estado: EstadoEvento;
  ponenteId: number;
  auditorioId?: number; 
}
