import { Injectable } from '@nestjs/common';
import { CreateReunionDto } from './dto/create-reunion.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Reuniones } from './reuniones.entity';
import { Repository } from 'typeorm';

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
      
}
