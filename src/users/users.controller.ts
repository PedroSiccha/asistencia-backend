import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-rol';

@Controller('users')
export class UsersController {

      constructor(private usersService: UsersService) {}

      @HasRoles(JwtRole.ADMIN)
      @UseGuards(JwtAuthGuard, JwtRolesGuard)
      @Get()
      findAll() {
            return this.usersService.findAll();
      }

      @Post()
      create(@Body() user: CreateUserDto) {
            return this.usersService.create(user);
      }

      @UseGuards(JwtAuthGuard)
      @Put(':id')
      update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
            return this.usersService.update(id, user);
      }

      @UseGuards(JwtAuthGuard)
      @Post('updateWithImage/:id')
      @UseInterceptors(FileInterceptor('file'))
      updateWithImage(
            @UploadedFile(
                  new ParseFilePipe({
                        validators: [
                              new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), //Imagenes de 10 MEGAS
                              new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                        ],
                  }),
            ) file: Express.Multer.File,
            @Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto
      ) {
            return this.usersService.updateWithImage(file, id, user);
      }
}
