import { Body, Controller, Get, Post, Put, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-rol';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { ListAsistenciaDto } from './dto/list-asistencia.dto';

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

      @HasRoles(JwtRole.ADMIN)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Post('list/:id')
      listAsistentesReunion(
            @Param('id', ParseIntPipe) id: number
      ) {
            return this.asistenciaService.listAsistentesReunion(id)
      }

      @HasRoles(JwtRole.ADMIN)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Get('reportePromAsistencia')
      reportePromedioAsistentes() {
            return this.asistenciaService.reportePromedioAsistentes();
      }

      @HasRoles(JwtRole.ADMIN)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Post('reportePromAsistenciaUsuario/:id')
      reportePromedioAsistenciaPorUsuario(
            @Param('id', ParseIntPipe) id: number
      ) {
            return this.asistenciaService.reportePromedioAsistenciaPorUsuario(id)
      }

      @HasRoles(JwtRole.ADMIN)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Post('obtenerReunionesAsistidasPorUsuario/:id')
      obtenerReunionesAsistidasPorUsuario(
            @Param('id', ParseIntPipe) id: number
      ) {
            return this.asistenciaService.obtenerReunionesAsistidasPorUsuario(id)
      }
}
