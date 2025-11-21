import { TipoPonente } from '../entities/ponente.entity';
export class CreatePonenteDto {
  cedula: number;
  nombre: string;
  email: string;
  tipoPonente : TipoPonente;
  especialidad: string;
}
