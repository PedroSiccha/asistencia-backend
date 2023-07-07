import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateReunionDto } from './dto/create-reunion.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Reuniones } from './reuniones.entity';
import { Repository } from 'typeorm';
import { UpdateReunionDto } from './dto/update-reunion.dto';

@Injectable()
export class ReunionesService {
      constructor (
            @InjectRepository(Reuniones) private reunionRepository: Repository<Reuniones>
      ){}

      async create(reunion: CreateReunionDto) {
            const newReunion = this.reunionRepository.create(reunion)
            return this.reunionRepository.save(newReunion)
      }

      async findAll() {
            const data = await this.reunionRepository.find({
                  where: {
                    estado: 'pendiente',
                  },
                  order: {
                    fecha: 'DESC',
                  }
                });
            return data;
      }

      async findAllReuniones() {
            const data = await this.reunionRepository.find();
            return data;
      }

      async findLast() {
            let data = [];
            data = await this.reunionRepository.find({
                  where: {
                    estado: 'pendiente',
                  },
                  order: {
                    fecha: 'DESC',
                  },
                  take: 1,
                });
              
                return data[0];
      }

      async closeReunion(id: number, reunion: UpdateReunionDto) {
            console.log("UPDATEREUNION", reunion);
            const reunionFound = await this.reunionRepository.findOneBy({ id:id });

            if (!reunionFound) {
                  throw new HttpException('La reunión no existe', HttpStatus.NOT_FOUND);
            }

            reunionFound.estado = reunion.estado;
            return this.reunionRepository.save(reunionFound);
      }
      
}
