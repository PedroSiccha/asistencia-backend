export class CreateUserDto {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  image?: string;
  qr?: string;
  password: string;
  notification_token?: string;
}
