import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './asistencia.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { find } from 'rxjs';
import { User } from 'src/users/user.entity';
import { Reuniones } from 'src/reuniones/reuniones.entity';
import { ListAsistenciaDto } from './dto/list-asistencia.dto';

@Injectable()
export class AsistenciaService {
      constructor(
            @InjectRepository(Asistencia) private asistenciaRepository: Repository<Asistencia>,
            @InjectRepository(User) private usersRepository: Repository<User>,
            @InjectRepository(Reuniones) private reunionRepository: Repository<Reuniones>
      ) {}

      async create(asistencia: CreateAsistenciaDto) {
            const user = await this.usersRepository.findOne({ 
                  where: {
                        dni: asistencia.dni
                  } 
            });

            const reunion = await this.reunionRepository.findOne({ 
                  where: {
                        id: asistencia.reunionId
                  } 
            });

            const findAsistencia = await this.asistenciaRepository.findOne({
                  where: {
                        user: { id: user.id }, 
                        reunion: { id: asistencia.reunionId }, 
                      },
                });

            if (findAsistencia) {
                  throw new HttpException('El usuario ya se encuentra en la reunión', HttpStatus.CONFLICT);
            }

            const newAsistencia = await this.asistenciaRepository.create({estado: asistencia.estado,
                  hora: asistencia.hora,
                  user: user,
                  reunion: reunion,
                });

            return this.asistenciaRepository.save(newAsistencia);
      }

      async listAsistentesReunion(reunionId: number) {
            let data = await this.asistenciaRepository
                                    .createQueryBuilder('asistencias')
                                    .leftJoinAndSelect('asistencias.user', 'user')
                                    .where('asistencias.estado = :estado', { estado: 'ASISTIO' })
                                    .andWhere('asistencias.reunion = :reunionId', { reunionId })
                                    .orderBy('asistencias.hora', 'DESC')
                                    .getMany();
            
            for (const dt of data) {
                  delete dt.user.password;
            }
              
                return data;
      }

      async reportePromedioAsistentes() {
            let data = {}

            const totalUsuarios = await this.usersRepository.count();
            const totalRegistros = await this.asistenciaRepository.count();
            const asistentes = await this.asistenciaRepository.count({
            where: { estado: 'ASISTIO' }
            });

            const noAsistentes = totalRegistros - asistentes;
            const promedioAsistentes = (asistentes / totalUsuarios).toFixed(2);
            const promedioNoAsistentes = (noAsistentes / totalUsuarios).toFixed(2);

            data = {
                  prom_asistentes: promedioAsistentes,
                  prom_noasistentes: promedioNoAsistentes
            }

            return data;
      }

      async reportePromedioAsistenciaPorUsuario(userId: number) {
            let data = {}

            const totalReuniones = await this.reunionRepository.count();
  
            const options: FindManyOptions<Asistencia> = {
            where: { user: { id: userId } },
            };
            const totalAsistencias = await this.asistenciaRepository.count(options);

            const totalInasistencias = totalReuniones - totalAsistencias;

            const promedioAsistencia = (totalAsistencias / totalReuniones).toFixed(2);
            const promedioInasistencia = (totalInasistencias / totalReuniones).toFixed(2);

            data = {
                  prom_asistentes: promedioAsistencia,
                  prom_noasistentes: promedioInasistencia
            }

            return data;
      }

      async obtenerReunionesAsistidasPorUsuario(userId: number) {
            const options: FindManyOptions<Asistencia> = {
                  where: { user: { id: userId } },
                  relations: ['reunion', 'user'],
                };
              
                const asistencias = await this.asistenciaRepository.find(options);
              
                return asistencias;
      }
}
