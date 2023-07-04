import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { In, Repository } from "typeorm";
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

            create(user: CreateUserDto) {
                  const newUser = this.usersRepository.create(user);
                  return this.usersRepository.save(newUser);
            }

            async createWithImage(file: Express.Multer.File, user: CreateUserDto) {
                  console.log("createWithImage", file);
                  const url = await storage(file, file.originalname);

                  if (url === undefined && url === null) {
                        throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
                  }
                  
                  user.image = url;
                  const newUser = this.usersRepository.create(user);
                  return this.usersRepository.save(newUser);
            }

            async findAll(){
                  const data = await this.usersRepository.find({ relations: ['roles'] });
                  for (const dt of data) {
                        delete dt.password;
                  }
                  return data;
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
