import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserDtoRequest {
  @IsNotEmpty({ message: 'El nombre completo es requerido' })
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  fullName: string;

  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  password: string;

  @IsNotEmpty({ message: 'El número de teléfono es requerido' })
  phone: string;

  @IsNotEmpty({ message: 'El campo no puede estar vacio' })
  rolId: number;
}
