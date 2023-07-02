import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { Asistencia } from './asistencia.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { Reuniones } from 'src/reuniones/reuniones.entity';
import { ReunionesService } from 'src/reuniones/reuniones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, User, Reuniones])],
  providers: [AsistenciaService, JwtStrategy, UsersService, ReunionesService],
  controllers: [AsistenciaController]
})
export class AsistenciaModule {}
