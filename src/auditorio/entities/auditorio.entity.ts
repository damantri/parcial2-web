import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evento } from '../../evento/entities/evento.entity';

@Entity()
export class Auditorio {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;
  @Column()
  nombre: string;
  @Column({ type: 'int'})
  capacidad: number;
  @Column()
  ubicacion: string;
  @OneToMany(() => Evento, (evento) => evento.auditorio)
  eventos: Evento[];
}

