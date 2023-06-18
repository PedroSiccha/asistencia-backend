import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Rol } from './roles/rol.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST || 'localhost',
      port: parseInt(process.env.PORT) || 3306,
      username: process.env.USER || 'root', 
      password: process.env.PASSWORD || '1234',
      database: process.env.DATABASE || 'asistencia_db',
      entities: [User, Rol],
      synchronize: true,
    }),
    
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
