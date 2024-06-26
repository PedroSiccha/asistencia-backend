import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-rol';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { CreateReunionDto } from './dto/create-reunion.dto';
import { UpdateReunionDto } from './dto/update-reunion.dto';

@Controller('reuniones')
export class ReunionesController {
      constructor(private reunionesService: ReunionesService) {}

      @HasRoles(JwtRole.ADMIN)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Post()
      create(
            @Body() reunion: CreateReunionDto
      ) {
            return this.reunionesService.create(reunion)
      }

      @HasRoles(JwtRole.ADMIN, JwtRole.COLL)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Get()
      findAll() {
            return this.reunionesService.findAll();
      }

      @HasRoles(JwtRole.ADMIN, JwtRole.COLL)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Get('all')
      findAllReuniones() {
            return this.reunionesService.findAllReuniones();
      }

      @HasRoles(JwtRole.ADMIN, JwtRole.COLL)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Get('last')
      findLast() {
            return this.reunionesService.findLast();
      }

      @HasRoles(JwtRole.ADMIN)
      @UseGuards(JwtAuthGuard)
      @Put('close/:id')
      closeReunion(
            @Param('id', ParseIntPipe) id: number, 
            @Body() reunion: UpdateReunionDto
            ) {
                  return this.reunionesService.closeReunion(id, reunion);
            }
      
}
