import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { hash } from "bcrypt";
import { Rol } from 'src/roles/rol.entity';
import { Asistencia } from 'src/asistencia/asistencia.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  dni: string;

  @Column()
  email?: string = null;

  @Column()
  phone: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  password: string;

  @Column({ unique: true})
  numero_padron: number;

  @Column()
  manzana: string;

  @Column()
  lote: number;

  @Column()
  metros: string;

  @Column()
  lotes_detalle: string;

  @Column()
  lotes_cantidad: string;

  @Column({ nullable: true })
  notification_token: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Asistencia, asistencia => asistencia.user)
  asistencias: Asistencia[];

  @JoinTable({
    name: 'user_has_roles',
    joinColumn: {
      name: 'id_user'
    },
    inverseJoinColumn: {
      name: 'id_rol'
    }
  })
  @ManyToMany(() => Rol, (rol) => rol.users)
  roles: Rol[];


  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, Number(process.env.HASH_SALT));
  }
}
