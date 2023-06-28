import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { Asistencia } from './asistencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia])],
  providers: [AsistenciaService, JwtStrategy],
  controllers: [AsistenciaController]
})
export class AsistenciaModule {}
