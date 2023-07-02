import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-rol';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
      constructor(private asistenciaService: AsistenciaService) {}

      @HasRoles(JwtRole.ADMIN)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Post()
      create(
            @Body() asistencia: CreateAsistenciaDto
      ) {
            return this.asistenciaService.create(asistencia)
      }
}
