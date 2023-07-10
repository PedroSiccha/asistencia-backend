import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { In, Like, Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import storage = require ("../utils/cloud_storage.js");
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { Rol } from 'src/roles/rol.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
      constructor(
            @InjectRepository(User) private usersRepository: Repository<User>
            ) {}

            async create(user: CreateUserDto) {
                  const userFound = await this.usersRepository.findOneBy({ dni: user.dni });

                  if (userFound) {
                        throw new HttpException('El DNI ya fué registrado', HttpStatus.NOT_FOUND);
                  }

                  const userNFound = await this.usersRepository.findOneBy({ numero_padron: user.numero_padron });

                  if (userNFound) {
                        throw new HttpException('El Número de padrón ya fué registrado', HttpStatus.NOT_FOUND);
                  }
                  const newUser = this.usersRepository.create(user);
                  return this.usersRepository.save(newUser);
            }

            async createWithImage(file: Express.Multer.File, user: CreateUserDto) {
                  console.log("createWithImage_1", file);
                  const url = await storage(file, file.originalname);

                  const userFound = await this.usersRepository.findOneBy({ dni: user.dni });

                  if (userFound) {
                        throw new HttpException('El DNI ya fué registrado', HttpStatus.NOT_FOUND);
                  }

                  const userNFound = await this.usersRepository.findOneBy({ numero_padron: user.numero_padron });

                  if (userNFound) {
                        throw new HttpException('El Número de padrón ya fué registrado', HttpStatus.NOT_FOUND);
                  }

                  if (url === undefined && url === null) {
                        throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
                  }
                  console.log("createWithImage", url)
                  user.image = url;
                  const newUser = this.usersRepository.create(user);
                  console.log("createWithImage", newUser)
                  return this.usersRepository.save(newUser);
            }

            async findAll(){
                  const data = await this.usersRepository.find(
                        { 
                              relations: ['roles'], 
                              order: { numero_padron: 'ASC', } 
                        });
                  for (const dt of data) {
                        delete dt.password;
                  }
                  return data;
            }

            async findByName(dato: string) {
                  return await this.usersRepository.find({
                        where: [
                              { name: Like(`%${ dato }%`) },
                              { lastname: Like(`%${ dato }%`) },
                              { dni: Like(`%${ dato }%`) },
                        ]
                        
                  });
            }

            async update(id: number, user: UpdateUserDto) {
                  console.log("UsersService", user);
                  const userFound = await this.usersRepository.findOneBy({ id:id });

                  if (!userFound) {
                        throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
                  }

                  const updatedUser = Object.assign(userFound, user);
                  return this.usersRepository.save(updatedUser);
            }

            async updateWithImage(file: Express.Multer.File, id: number, user: UpdateUserDto) {
                  console.log("updateWithImage", file);
                  const url = await storage(file, file.originalname);

                  if (url === undefined && url === null) {
                        throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
                  }
                  const userFound = await this.usersRepository.findOneBy({ id:id });

                  if (!userFound) {
                        throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
                  }
                  user.image = url;
                  const updatedUser = Object.assign(userFound, user);
                  return this.usersRepository.save(updatedUser);
            }
}
