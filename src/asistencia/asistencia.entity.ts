import { Reuniones } from "src/reuniones/reuniones.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'asistencias' })
export class Asistencia {
      @PrimaryGeneratedColumn()
      id: number;

      @Column()
      estado: string;

      @Column()
      hora: string;

      @ManyToOne(() => User, user => user.asistencias)
      @JoinTable({ name: 'id_user' })
      user: User;

      @ManyToOne(() => Reuniones, reunion => reunion.asistencias)
      @JoinTable({ name: 'id_reunion' })
      reunion: Reuniones;
}