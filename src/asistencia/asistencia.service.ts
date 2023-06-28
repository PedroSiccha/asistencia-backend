import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './asistencia.entity';
import { Repository } from 'typeorm';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Injectable()
export class AsistenciaService {
      constructor(
            @InjectRepository(Asistencia) private asistenciaRepository: Repository<Asistencia>
      ) {}

      create(asistencia: CreateAsistenciaDto) {
            const newAsistencia = this.asistenciaRepository.create(asistencia);
            return this.asistenciaRepository.save(newAsistencia);
      }
}
