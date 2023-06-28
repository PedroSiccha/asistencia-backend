import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateReunionDto {
      @IsNotEmpty()
      @IsString()
      asunto: string;

      @IsNotEmpty()
      @IsString()
      detalle: string;

      @IsNotEmpty()
      @IsString()
      fecha: string;
}