import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evento } from '../../evento/entities/evento.entity';

export type TipoPonente = 'Interno' | 'Invitado';

@Entity()
export class Ponente {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'int' })
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  tipoPonente: TipoPonente; 

  @Column()
  especialidad: string;
  
  @OneToMany(() => Evento, (evento) => evento.ponente)
  eventos: Evento[];
}
