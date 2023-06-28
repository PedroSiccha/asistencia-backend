import { Module } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { ReunionesController } from './reuniones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reuniones } from './reuniones.entity';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Reuniones])],
  providers: [ReunionesService, JwtStrategy],
  controllers: [ReunionesController]
})
export class ReunionesModule {}
