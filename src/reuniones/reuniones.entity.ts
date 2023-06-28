import { Asistencia } from "src/asistencia/asistencia.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reuniones' })
export class Reuniones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  asunto: string;

  @Column()
  detalle: string;

  @Column({ unique: true })
  fecha: string;

  @Column()
  estado: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Asistencia, asistencia => asistencia.reunion)
  asistencias: Asistencia[];
}
