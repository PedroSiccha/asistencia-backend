import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './asistencia.entity';
import { Repository } from 'typeorm';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { find } from 'rxjs';
import { User } from 'src/users/user.entity';
import { Reuniones } from 'src/reuniones/reuniones.entity';

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
}
