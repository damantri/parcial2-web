import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ponente } from '../../ponente/entities/ponente.entity';
import { Auditorio } from '../../auditorio/entities/auditorio.entity';
import { Asistente } from '../../asistente/entities/asistente.entity';
import { Long } from 'typeorm/browser';

export type EstadoEvento = 'Propuesto' | 'Aprobado' | 'Rechazado';
@Entity()
export class Evento {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: Long;
  @Column()
  titulo: string;
  @Column()
  descripcion: string;
  @Column({ type: 'timestamp' })
  fecha: Date;
  @Column({ type: 'int' })
  duracionHoras: number;
  @Column()
  estado: EstadoEvento;
  @ManyToOne(() => Ponente, (ponente) => ponente.eventos, { eager: true })
  ponente: Ponente;
  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos, {
    nullable: true,
    eager: true,
  })
  auditorio: Auditorio | null;
  @OneToMany(() => Asistente, (asistente) => asistente.evento, {
    cascade: true,
  })
  asistentes: Asistente[];
}
