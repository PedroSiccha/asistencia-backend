import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Rol } from './roles/rol.entity';
import { ReunionesModule } from './reuniones/reuniones.module';
import { Reuniones } from './reuniones/reuniones.entity';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { Asistencia } from './asistencia/asistencia.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_DB,
      port: parseInt(process.env.PORT_DB),
      username: process.env.USER_DB, 
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
      entities: [User, Rol, Reuniones, Asistencia],
      synchronize: true,
    }),
    
    UsersModule,
    AuthModule,
    RolesModule,
    ReunionesModule,
    AsistenciaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
