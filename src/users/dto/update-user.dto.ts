import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateUserDto {
      
      @IsNotEmpty()
      @IsString()
      name?: String;

      @IsNotEmpty()
      @IsString()
      lastname?: String;
      
      image?: String;
      notification_token?: String;
}