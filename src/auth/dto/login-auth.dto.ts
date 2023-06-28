import { IsNotEmpty, IsString, IsEmail, IsNumber } from "class-validator";
export class LoginAuthDto {

      @IsNotEmpty()
      @IsString()
      dni: string;

      @IsNotEmpty()
      @IsString()
      password: string;
}