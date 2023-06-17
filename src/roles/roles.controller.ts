import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('roles')
export class RolesController {
      constructor(
            private rolesService: RolesService
      ) {}

      @UseGuards(JwtAuthGuard)
      @Post()
      create(@Body() rol: CreateRolDto) {
            return this.rolesService.create(rol);
      }
}
