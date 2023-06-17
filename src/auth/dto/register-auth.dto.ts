import { IsString, IsEmail, IsNotEmpty, MinLength, IsInt } from "class-validator";

export class RegisterAuthDto {

      @IsNotEmpty()
      @IsString()
      name: string;

      @IsNotEmpty()
      @IsString()
      lastname: string;

      @IsNotEmpty()
      @MinLength(8, { message: 'El DNI debe contar con mínimo 8 números' })
      dni: string;

      @IsNotEmpty()
      @IsString()
      @IsEmail()
      email: string;

      @IsNotEmpty()
      @IsString()
      phone: string;

      @IsNotEmpty()
      @IsString()
      qr?: string;

      @IsNotEmpty()
      @IsString()
      @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres'})
      password: string;

      rolesIds: [];
    }
    