import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository, In } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/rol.entity';

@Injectable()
export class AuthService {
      constructor(
            @InjectRepository(User) private usersRepository: Repository<User>,
            @InjectRepository(Rol) private rolesRepository: Repository<Rol>,
            private jwtService: JwtService
            ) {}
      async register(user: RegisterAuthDto) { 
            const dniExist = await this.usersRepository.findOneBy({ dni: user.dni });

            if (dniExist) {
                  throw new HttpException('El DNI ya esta registrado', HttpStatus.CONFLICT);
            }

            const phoneExist = await this.usersRepository.findOneBy({ phone: user.phone });

            if (phoneExist) {
                  throw new HttpException('El TELEFONO ya esta registrado', HttpStatus.CONFLICT);
            }

            const newUser = this.usersRepository.create(user);
            let rolesIds = [];
            if (user.rolesIds !== undefined && user.rolesIds !== null) {
                  rolesIds = user.rolesIds;
            } else {
                  rolesIds.push('COLL');
            }
            
            const roles = await this.rolesRepository.findBy({ id: In(rolesIds) });
            newUser.roles = roles;
            const userSaved = await this.usersRepository.save(newUser);
            const rolesString = userSaved.roles.map(rol => rol.id);
            const payload = { id: userSaved.id, name: userSaved.name, roles:  rolesString };
            const token = this.jwtService.sign(payload);
            const data = {
                  user: userSaved,
                  token: 'Bearer ' + token
            }

            delete data.user.password;
            return data;
      }

      async login(loginData: LoginAuthDto) {
            const { dni, password } = loginData;
            console.log("AUTHSERVICE", loginData);
            const userFound = await this.usersRepository.findOne({ 
                  where: { dni: dni },
                  relations: ['roles']
             });
            if (!userFound) {
                  throw new HttpException('El DNI no esta registrado', HttpStatus.NOT_FOUND);
            }

            const isPasswordValid = await compare(password, userFound.password);
            if (!isPasswordValid) {
                  throw new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
            }

            const rolesIds = userFound.roles.map(rol => rol.id);
            const payload = { id: userFound.id, name: userFound.name, roles: rolesIds };
            const token = this.jwtService.sign(payload);
            const data = {
                  user: userFound,
                  token: 'Bearer ' + token
            }

            delete data.user.password;
            return data;

      }
}
