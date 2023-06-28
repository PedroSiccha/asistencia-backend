export class CreateUserDto {
  name: string;
  lastname: string;
  dni: string;
  email?: string = null;
  phone: string;
  image?: string;
  qr?: string;
  password: string;
  numero_padron: number;
  manzana: string;
  lote: number;
  metros: string;
  lotes_detalle?: string;
  lotes_cantidad: string;
  notification_token?: string;
}